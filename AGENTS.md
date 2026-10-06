> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

> [!IMPORTANT]
> **Bilingual Integrity Rule**: Grad Loan Navigator is fully bilingual (English and Spanish).
> Whenever adding or editing content, routes, blog posts, calculators, or UI elements, always ensure:
> 1. All translation keys are added and accurate in both `en` and `es` within `src/i18n/translations.ts`.
> 2. Search entries in `src/components/search/searchIndex.ts` include complete English and Spanish titles, descriptions, badges, and keywords.
> 3. Blog posts and interactive components seamlessly render localized Spanish copy when `lang === "es"`.
> 4. Never leave untranslated English placeholder text in Spanish views or Spanish dictionaries.

