"use client";
import styles from "./styles.module.css";
import { FormEvent, useState } from "react";
import FormField from "@/components/FormField";
import CheckBox from "@/components/CheckBox";
import { QuizForm, QuizInterface } from "@/types/types";
import Editor from "@/components/Editor";
import Icon from "@/components/Icon";
import icPlus from "@/public/ic_plus.svg";
import icMinus from "@/public/ic_minus.svg";

type Props = {
  quiz?: QuizInterface;
  mode: string;
};

const QuizForm = ({ quiz, mode }: Props) => {
  const [form, setForm] = useState<QuizForm>({
    title: quiz?.title || "",
    prompt: quiz?.prompt || "",
    kind: quiz?.kind || "single",
    choices: quiz?.choices || ["", "", "", ""],
    correctAnswers: quiz?.correctAnswers || [],
    codeSnippet: quiz?.codeSnippet || "",
  });

  const handleChange = (name: keyof QuizForm, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const handleCheckbox = (value: string) => {
    setForm({ ...form, kind: value });
  };
  const handleChoices = (index: number, value: string) => {
    const newValue = [...form.choices];
    newValue[index] = value;
    setForm({ ...form, choices: newValue });
  };

  const handleCorrectAnswers = (index: number) => {
    let newValue = form.correctAnswers;
    if (form.correctAnswers.includes(index)) {
      newValue = newValue.filter((number) => number !== index);
    } else {
      newValue = [...form.correctAnswers, index];
    }
    setForm({ ...form, correctAnswers: newValue });
  };

  const handleAddAnswer = () => {
    setForm({ ...form, choices: [...form.choices, ""] });
  };

  const handleDeleteAnswer = (index: number) => {
    const newArr = [...form.choices];
    newArr.splice(index, 1);
    setForm({ ...form, choices: newArr, correctAnswers: [] });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } else {
      const response = await fetch(`/api/quiz/${quiz?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <FormField
        title="Title"
        placeholder="Enter quiz title"
        state={form.title}
        onFieldChange={(value) => handleChange("title", value)}
      />
      <div style={{ display: "flex", width: "700px", gap: "10px" }}>
        <div style={{ width: "50%" }}>
          <FormField
            title="Prompt"
            state={form.prompt}
            isTextArea
            onFieldChange={(value) => handleChange("prompt", value)}
          />
        </div>
        <div style={{ width: "50%" }}>
          <label
            style={{
              fontFamily: "var(--primary-font)",
              fontSize: "0.8rem",
              fontWeight: "600",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Code Snippet
          </label>
          <Editor
            height="150px"
            minWidth="0"
            code={form.codeSnippet}
            width="100%"
            onChange={(value: any) => handleChange("codeSnippet", value)}
          />
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: 10 }}>
        <CheckBox
          label="Single choice"
          checked={form.kind === "single"}
          onChange={() => handleCheckbox("single")}
        />
        <CheckBox
          label="Multiple choice"
          checked={form.kind === "multiple"}
          onChange={() => handleCheckbox("multiple")}
        />
      </div>

      {form.choices.map((choice, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", marginRight: "5px" }}>
            <FormField
              title={`Choice ${index + 1}`}
              state={form.choices[index]}
              onFieldChange={(value) => handleChoices(index, value)}
            />
          </div>
          <CheckBox
            label=""
            checked={form.correctAnswers.includes(index)}
            onChange={() => handleCorrectAnswers(index)}
          />
          <div
            onClick={() => handleDeleteAnswer(index)}
            style={{
              backgroundColor: "var(--primary-color)",
              borderRadius: "50%",
            }}
          >
            <Icon
              src={icMinus}
              width={20}
              height={20}
              style={{ width: 20, height: 20 }}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddAnswer}
        style={{
          display: "flex",
          backgroundColor: "var(--primary-color)",
          marginBottom: 10,
          color: "white",
          padding: "0 5px",
          fontWeight: 700,
          borderRadius: 4,
          border: "unset",
        }}
      >
        <Icon src={icPlus} width={30} height={30} />
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizForm;
