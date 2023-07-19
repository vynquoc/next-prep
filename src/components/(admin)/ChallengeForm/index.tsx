"use client";
import { FormEvent, useState } from "react";
import FormField from "@/components/FormField";
import CheckBox from "@/components/CheckBox";
import { QuizForm, QuizInterface } from "@/types/types";
import Editor from "@/components/Editor";
import { slugify } from "@/utils";

type Props = {
  challenge?: any;
};

const ChallengeForm = ({ challenge }: Props) => {
  const [form, setForm] = useState({
    name: challenge?.name || "",
    prompt: challenge?.prompt || "",
    category: challenge?.category || "",
    type: challenge?.type || ["", "", "", ""],
    slug: challenge?.slug || "",
    hints: challenge?.hints || [""],
    languageToWrite: challenge?.languagueToWrite || "",
    promptCode: challenge?.promptCode || { css: "", js: "", html: "" },
    reactConfig: challenge?.reactConfig || { componentName: "" },
    solution: challenge?.solution || "",
    difficulty: challenge?.difficulty || "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleHint = (index: number, value: string) => {
    const newValue = [...form.hints];
    newValue[index] = value;
    setForm({ ...form, hints: newValue });
  };

  const handleHTML = (value: string) => {
    const newValue = { ...form.promptCode };
    newValue["html"] = value;
    setForm({ ...form, promptCode: newValue });
  };

  const handleCSS = (value: string) => {
    const newValue = { ...form.promptCode };
    newValue["css"] = value;
    setForm({ ...form, promptCode: newValue });
  };

  const handleJS = (value: string) => {
    const newValue = { ...form.promptCode };
    newValue["js"] = value;
    setForm({ ...form, promptCode: newValue });
  };

  const handleComponentName = (value: string) => {
    const newValue = { ...form.reactConfig };
    newValue.componentName = value;
    setForm({ ...form, reactConfig: newValue });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const slugName = slugify(form.name);
    const data = { ...form, slug: slugName };
    const response = await fetch("/api/challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const challenge = await response.json();
    console.log(challenge);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        title="Name"
        placeholder="Enter challenge name"
        state={form.name}
        onFieldChange={(value) => handleChange("name", value)}
      />
      <FormField
        title="Category"
        state={form.category}
        onFieldChange={(value) => handleChange("category", value)}
      />

      <FormField
        title="Type"
        state={form.type}
        onFieldChange={(value) => handleChange("type", value)}
      />
      <FormField
        title="Prompt"
        state={form.prompt}
        isTextArea
        onFieldChange={(value) => handleChange("prompt", value)}
      />
      <FormField
        title="Language To Write"
        state={form.languageToWrite}
        onFieldChange={(value) => handleChange("languageToWrite", value)}
      />
      <div
        style={{
          display: "flex",
          width: 1000,
          height: 300,
          justifyContent: "space-between",
        }}
      >
        <label>HTML</label>
        <Editor
          language="html"
          code={form.promptCode.html}
          onChange={handleHTML}
        />
        <label>CSS</label>
        <Editor
          language="css"
          code={form.promptCode.css}
          onChange={handleCSS}
        />
        <label>JS</label>
        <Editor
          language="javascript"
          code={form.promptCode.js}
          onChange={handleJS}
        />
      </div>
      <h3>React config</h3>
      <FormField
        title="Component Name"
        state={form.reactConfig.componentName}
        onFieldChange={(value) => handleComponentName(value)}
      />
      <FormField
        title="Solution"
        state={form.solution}
        onFieldChange={(value) => handleChange("solution", value)}
      />
      <FormField
        title="Difficulty"
        state={form.difficulty}
        onFieldChange={(value) => handleChange("difficulty", value)}
      />

      {form.hints.map((hint: any, index: number) => (
        <div key={index}>
          <FormField
            title={`Hint ${index + 1}`}
            state={form.hints[index]}
            onFieldChange={(value) => handleHint(index, value)}
          />
        </div>
      ))}
      <button type="submit">create</button>
    </form>
  );
};

export default ChallengeForm;
