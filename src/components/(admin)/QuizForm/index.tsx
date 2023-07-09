"use client";
import { FormEvent, useState } from "react";
import FormField from "@/components/FormField";
import CheckBox from "@/components/CheckBox";
import { QuizForm, QuizInterface } from "@/types/types";

type Props = {
  quiz?: QuizInterface;
};

const QuizForm = ({ quiz }: Props) => {
  const [form, setForm] = useState<QuizForm>({
    title: quiz?.title || "",
    prompt: quiz?.prompt || "",
    kind: quiz?.kind || "single",
    choices: quiz?.choices || ["", "", "", ""],
    correctAnswers: quiz?.correctAnswers || [],
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const quiz = await response.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        title="Title"
        placeholder="Enter quiz title"
        state={form.title}
        onFieldChange={(value) => handleChange("title", value)}
      />
      <FormField
        title="Prompt"
        state={form.prompt}
        isTextArea
        onFieldChange={(value) => handleChange("prompt", value)}
      />
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

      {form.choices.map((choice, index) => (
        <div key={index}>
          <FormField
            title={`Choice ${index + 1}`}
            state={form.choices[index]}
            onFieldChange={(value) => handleChoices(index, value)}
          />
          <CheckBox
            label="Correct answer"
            checked={form.correctAnswers.includes(index)}
            onChange={() => handleCorrectAnswers(index)}
          />
        </div>
      ))}
      <button type="submit">create</button>
    </form>
  );
};

export default QuizForm;
