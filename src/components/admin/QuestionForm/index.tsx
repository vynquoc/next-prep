"use client";
import { FormEvent, useState, useTransition } from "react";
import styles from "./styles.module.css";
import { TriviaQuestionInterface } from "@/types/types";
import {
  addTriviaQuestion,
  deleteTriviaQuestion,
  updateTriviaQuestion,
} from "@/actions";

import LoadingIndicator from "@/components/LoadingIndicator";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import FormDropdown from "@/components/FormDropdown";
import { questionCategoryOptions } from "@/constant";

type Props = {
  mode: "create" | "update";
  question?: TriviaQuestionInterface;
};

const QuestionForm = ({ mode, question }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [form, setForm] = useState({
    title: question?.title || "",
    content: question?.content || "",
    category: question?.category || "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({
      title: question?.title || "",
      content: question?.content || "",
      category: question?.category || "",
    });
  };

  const handleDelete = () => {
    if (question) {
      startTransition(() => deleteTriviaQuestion(question?.id));
      router.push("/admin/manage-trivia-questions");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      startTransition(() =>
        addTriviaQuestion(form.title, form.content, form.category)
      );
    } else {
      if (question) {
        startTransition(() => updateTriviaQuestion(question?.id, form));
      }
    }
    router.push("/admin/manage-trivia-questions");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1>{mode === "create" ? "Create Question" : "Edit Question"}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isPending && (
              <LoadingIndicator color="var(--primary-color)" width={25} />
            )}
            <button type="button" className="button" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="button" onClick={handleDelete}>
              Delete
            </button>
            <button className="button">Save</button>
          </div>
        </div>
        <FormField
          title="Title"
          state={form.title}
          onFieldChange={(value) => handleChange("title", value)}
        />
        <FormDropdown
          label="Category"
          options={questionCategoryOptions}
          state={form.category}
          onFieldChange={(value) => handleChange("category", value)}
        />
        <FormField
          title="Content"
          textAreaHeight="300px"
          isTextArea
          state={form.content}
          onFieldChange={(value) => handleChange("content", value)}
        />
      </form>
      <div
        style={{
          backgroundColor: "var(--primary-bg)",
          color: "white",
          fontFamily: "var(--primary-font)",
          padding: "10px",
        }}
      >
        <ReactMarkdown className="markdown">{form.content}</ReactMarkdown>
      </div>
    </>
  );
};

export default QuestionForm;
