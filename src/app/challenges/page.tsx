import { db } from "@/lib/db";
import Link from "next/link";

const CodingChallenges = async () => {
  const challenges = await db.challenge.findMany();
  return (
    <div>
      {challenges.map((challenge) => (
        <Link key={challenge.id} href={`/challenges/${challenge.slug}`}>
          {challenge.name}
        </Link>
      ))}
    </div>
  );
};

export default CodingChallenges;
