"use client";
import styles from "./styles.module.css";
import { FormEvent, useState } from "react";
import FormField from "@/components/FormField";
import FormGroup from "@/components/FormGroup";
import { ChallengeInterface } from "@/types/types";
import Editor from "@/components/Editor";
import { slugify } from "@/utils";
import LivePreview from "@/components/LivePreview";
import FormDropdown from "@/components/FormDropdown";
import icTrash from "@/public/ic_trash_primary.svg";
import Icon from "@/components/Icon";
import {
  categoryOptions,
  typeOptions,
  difficultyOptions,
  tagOptions,
  languageOptions,
} from "@/constant";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useRouter } from "next/navigation";

type Props = {
  challenge?: ChallengeInterface;
  mode: string;
};

const ChallengeForm = ({ challenge, mode }: Props) => {
  const [form, setForm] = useState({
    name: challenge?.name || "",
    prompt: challenge?.prompt || "",
    category: challenge?.category || "",
    type: challenge?.type || "",
    slug: challenge?.slug || "",
    hints: challenge?.hints || [],
    languageToWrite: challenge?.languageToWrite || "",
    promptCode: challenge?.promptCode || { css: "", js: "", html: "" },
    reactConfig: challenge?.reactConfig || { componentName: "" },
    solution: challenge?.solution || "",
    shortDescription: challenge?.shortDescription || "",
    tags: challenge?.tags || [],
    difficulty: challenge?.difficulty || "",
  });
  const [hintIndex, setHintIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReset = () => {
    setForm({
      name: challenge?.name || "",
      prompt: challenge?.prompt || "",
      category: challenge?.category || "",
      type: challenge?.type || "",
      slug: challenge?.slug || "",
      hints: challenge?.hints || [],
      languageToWrite: challenge?.languageToWrite || "",
      promptCode: challenge?.promptCode || { css: "", js: "", html: "" },
      reactConfig: challenge?.reactConfig || { componentName: "" },
      solution: challenge?.solution || "",
      shortDescription: challenge?.shortDescription || "",
      tags: challenge?.tags || [],
      difficulty: challenge?.difficulty || "",
    });
  };

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleAddHint = () => {
    setForm({ ...form, hints: [...form.hints, ""] });
  };

  const handleDeleteHint = (index: number) => {
    const newValue = [...form.hints];
    newValue.splice(index, 1);
    setForm({ ...form, hints: newValue });
  };

  const handleHint = (index: number, value: string) => {
    const newValue = [...form.hints];
    newValue[index] = value;
    setForm({ ...form, hints: newValue });
  };

  const handleTags = (value: string) => {
    let newValue = [...form.tags];
    if (newValue.includes(value)) {
      newValue = newValue.filter((tag) => tag !== value);
    } else {
      newValue = [...newValue, value];
    }
    setForm({ ...form, tags: newValue });
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
    setIsLoading(true);
    try {
      if (mode === "update") {
        const response = await fetch(`/api/challenge/${challenge?.slug}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        if (response.status === 200) {
          router.refresh();
          router.push("/admin/manage-coding-questions");
        }
      } else {
        const slugName = slugify(form.name);
        const updatedForm = { ...form, slug: slugName };
        const response = await fetch("/api/challenge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedForm),
        });
        if (response.status === 200) {
          router.refresh();
          router.push("/admin/manage-coding-questions");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h1>
          {mode === "create" ? "Create Challenge" : `Edit ${challenge?.name}`}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isLoading && (
            <LoadingIndicator color="var(--primary-color)" width={25} />
          )}
          <button className="button" onClick={handleReset}>
            Reset
          </button>
          <button className="button">Save</button>
        </div>
      </div>

      <FormGroup>
        <FormField
          width="50%"
          title="Name"
          placeholder="Enter challenge name"
          state={form.name}
          onFieldChange={(value) => handleChange("name", value)}
        />
        <FormField
          width="50%"
          title="Description"
          placeholder="Enter challenge name"
          state={form.shortDescription}
          onFieldChange={(value) => handleChange("shortDescription", value)}
        />
      </FormGroup>
      <FormGroup>
        <FormDropdown
          width="33%"
          state={form.category}
          label="Category"
          onFieldChange={(value) => handleChange("category", value)}
          options={categoryOptions}
        />

        <FormDropdown
          width="33%"
          state={form.type}
          label="Type"
          onFieldChange={(value) => handleChange("type", value)}
          options={typeOptions}
        />
        <FormDropdown
          width="33%"
          state={form.languageToWrite}
          label="Language"
          onFieldChange={(value) => handleChange("languageToWrite", value)}
          options={languageOptions}
        />
        <FormDropdown
          width="33%"
          state={form.difficulty}
          label="Difficulty"
          onFieldChange={(value) => handleChange("difficulty", value)}
          options={difficultyOptions}
        />
      </FormGroup>
      <FormField
        width="100%"
        title="Component Name"
        state={form.reactConfig.componentName}
        onFieldChange={(value) => handleComponentName(value)}
      />
      <FormGroup gap={60}>
        {tagOptions.map((option) => (
          <FormField
            key={option.value}
            title={option.displayText}
            width="20px"
            checked={form.tags.includes(option.value)}
            type="checkbox"
            onFieldChange={() => handleTags(option.value)}
          />
        ))}
      </FormGroup>
      <FormField
        title="Prompt"
        state={form.prompt}
        isTextArea
        onFieldChange={(value) => handleChange("prompt", value)}
      />

      {form.hints.map((hint: string, index: number) => (
        <div
          style={{ display: "flex", alignItems: "center", width: "80%" }}
          key={index}
          onMouseEnter={() => setHintIndex(index)}
          onMouseLeave={() => setHintIndex(null)}
        >
          <FormField
            width="90%"
            title={`Hint ${index + 1}`}
            state={form.hints[index]}
            onFieldChange={(value) => handleHint(index, value)}
          />
          {hintIndex === index && (
            <div
              style={{ cursor: "pointer", marginLeft: 5 }}
              onClick={() => handleDeleteHint(index)}
            >
              <Icon src={icTrash} width={25} height={25} />
            </div>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddHint} className="button">
        Add hint
      </button>

      <FormGroup>
        <div>
          <label>HTML</label>
          <Editor
            height="300px"
            language="html"
            code={form.promptCode.html}
            onChange={handleHTML}
          />
        </div>
        <div>
          <label>CSS</label>
          <Editor
            height="300px"
            language="css"
            code={form.promptCode.css}
            onChange={handleCSS}
          />
        </div>
        <div>
          <label>Javascript</label>
          <Editor
            height="300px"
            language="javascript"
            width="450px"
            code={form.promptCode.js}
            onChange={handleJS}
          />
        </div>
      </FormGroup>

      <LivePreview
        backgroundColor="#1E1E1E"
        style={{ marginTop: 10 }}
        html={form.promptCode.html}
        css={form.promptCode.css}
        js={form.promptCode.js}
        componentName={form.reactConfig.componentName}
        isReact={form.languageToWrite === "jsx"}
      />

      <div>
        <label>Solution</label>
        <Editor
          height="300px"
          language={form.languageToWrite || "jsx"}
          code={form.solution}
          onChange={(value: string) => handleChange("solution", value)}
        />
      </div>
    </form>
  );
};

export default ChallengeForm;
