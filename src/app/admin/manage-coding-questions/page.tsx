import { db } from "@/lib/db";
import Link from "next/link";

const CodingQuestionsManager = async () => {
  const challenges = await db.challenge.findMany();
  return (
    <div>
      <Link className="button" href="/admin/create-challenge">
        Create Challenge
      </Link>
      {challenges.map((challenge) => (
        <Link href={`/admin/edit-challenge/${challenge.slug}`}>
          {challenge.name}
        </Link>
      ))}
    </div>
  );
};

export default CodingQuestionsManager;
