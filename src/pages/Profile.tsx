import PlanDisplay from "../components/plan/PlanDisplay";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import {
  Calendar,
  Dumbbell,
  RefreshCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoading, plan } = useAuth();

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (!plan) {
    return <Navigate to="/onboarding" replace />;
  }

  function formateDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const StatCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
    <Card className="flex flex-col p-4 h-40 rounded-xl border border-gray-800 hover:border-yellow-400/20 transition-all cursor-pointer">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg ">
          <Icon className="w-4 h-4 text-(--color-accent)" />
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p className="text-sm font-semibold text-white leading-tight line-clamp-3">
        {value}
      </p>
    </Card>
  );

  console.log(JSON.stringify(plan, null,2));
  console.log(plan);
  
  

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Training Plan</h1>
            <p className="text-(--color-muted)">
              Version {plan.version} • Created{formateDate(plan.createdAt)}
            </p>
          </div>
          <Button variant="secondary" className="gap-2 cursor-pointer">
            <RefreshCcw className="w-4 h-4" />
            Regenerate Plan
          </Button>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Target} label="Goal" value={plan.overview.goal} />
          <StatCard
            icon={Calendar}
            label="Frequency"
            value={`${plan.overview.frequency}`}
          />
          <StatCard icon={Dumbbell} label="Split" value={plan.overview.split} />
          <StatCard
            icon={TrendingUp}
            label="Version"
            value={String(plan.version)}
          />
        </div>
        {/* Plan notes */}
        <Card className="border mb-8">
      <h2 className="font-semibold text-lg pl-3">Program Notes</h2>
      <p className="text-(--color-muted) text-sm leading-relaxed pl-3">
        {plan.overview.notes}
      </p>
        </Card>
        {/* Weekly Schedule */}
        <h2 className="font-semibold text-xl mb-4 pl-3">Weekly Schedule</h2>
        
        <PlanDisplay weeklySchedule={plan.weeklySchedule}  />
          
         <Card className="mb-8 border">
          <h2 className="font-semibold text-lg pl-3">Progression Strategy</h2>
          <p className="text-(--color-muted) text-sm leading-relaxed pl-3">
            {plan.progression}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
