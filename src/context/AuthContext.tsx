import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { authClient } from "@/lib/auth";
import { TrainingPlan, User, UserProfile } from "../types";
import { api } from "@/lib/api";

interface AuthontextType {
  user: User | null;
  plan: TrainingPlan | null
  isLoading: boolean;
  saveProfile: (
    profile: Omit<UserProfile, "userId" | "updatedAt">,
  ) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthontextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<any>(null);
 const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRefreshRef = useRef(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          setNeonUser(result.data.user);
        } else {
          setNeonUser(null);
        }
      } catch (error) {
        setNeonUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  useEffect(()=>{
    if(!isLoading){
      if(neonUser?.id){
        refreshData()
      } else{
        setPlan(null)
      }
      setIsLoading(false)
    }
  },[neonUser?.id, isLoading])

  //refreshDatamemozie

  const refreshData = useCallback(async()=>{
    if(!neonUser || isRefreshRef.current) return
    
    isRefreshRef.current = true

    try {
        //fetch profile
        // const profileData =

        //fetch plan
        const planData: any = await api.getCurrentPlan(neonUser.id).catch(()=>null)
        if(planData){
          setPlan({
           id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
          } as unknown as TrainingPlan)
        }
    } catch (error) {
        console.error("Error refreshing data:", error);
        
    }finally{
        isRefreshRef.current= false
    }
  },[neonUser?.id])

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ) {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
    await refreshData()
  }

  async function generatePlan() {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.generatePlan(neonUser.id);
    await refreshData()
  }

  return (
    <AuthContext.Provider value={{ user: neonUser, plan, isLoading, saveProfile, generatePlan, refreshData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
