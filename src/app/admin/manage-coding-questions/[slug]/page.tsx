"use client";
import ChallengeForm from "@/components/(admin)/ChallengeForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const ChallengeUpdate = () => {
  const [challenge, setChallenge] = useState<any>(null);
  const searchParams = useParams();
  useEffect(() => {
    const fetchChallenge = async () => {
      const response = await fetch(`/api/challenge/${searchParams.slug}`);
      const data = await response.json();
      setChallenge(data);
    };
    fetchChallenge();
  }, []);

  const handleSubmit = async (data: any) => {
    const response = await fetch(`/api/challenge/${searchParams.slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const challengeJson = await response.json();
    console.log(challengeJson);
  };
  return (
    <div>
      <ChallengeForm
        key={challenge?.id}
        challenge={challenge}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChallengeUpdate;
