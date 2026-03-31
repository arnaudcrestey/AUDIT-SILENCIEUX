return (
  <div className="mx-auto w-full max-w-[880px]">
    <form
      className="rounded-[26px] border border-audit-border-subtle bg-white/90 px-5 py-5 shadow-[0_18px_50px_rgba(31,39,64,0.05)] sm:px-6 sm:py-6"
      onSubmit={handleSubmit}
    >
      <label htmlFor="audit-content" className="sr-only">
        Collez ici votre site, une page ou une présentation
      </label>

      <textarea
        id="audit-content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={6}
        placeholder="Collez ici votre site, une page ou une présentation…"
        className="
          w-full
          min-h-[160px]
          resize-y
          rounded-[16px]
          border border-[#d9e0ec]
          bg-[#f2f5fa]
          px-5 py-4
          text-[15px]
          leading-7
          text-audit-text
          placeholder:text-audit-muted
          outline-none
          transition
          focus:bg-white
          focus:border-audit-blue
          focus:ring-4
          focus:ring-audit-halo
        "
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="text-[13px] text-audit-muted">
          {error ? (
            <span className="text-red-700">{error}</span>
          ) : (
            "Lecture immédiate — sans inscription"
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-audit-blue
            px-5 py-3
            text-[14px]
            font-medium
            text-white
            shadow-[0_10px_24px_rgba(49,84,199,0.25)]
            transition
            hover:-translate-y-[1px]
            hover:bg-audit-blue-hover
            disabled:opacity-60
          "
        >
          {loading ? "Ouverture…" : "Lancer l’audit"}
        </button>
      </div>
    </form>
  </div>
);
