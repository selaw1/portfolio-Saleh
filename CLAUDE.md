# Saleh Ahmad website

Static React + Vite site for Saleh Ahmad's accounting practice (saleh.selawii.com), prerendered at build time for SEO. Run `npm run build` to check any change; it must finish with `prerender: wrote N pages`.

## Blog posts

Each post is a Markdown file in `src/content/blog/`. The file name is the post's address (`texas-sales-tax-guide.md` is published at `/blog/texas-sales-tax-guide/`). The build adds every post to the blog list, the homepage, `sitemap.xml`, `llms.txt` and Google's structured data automatically.

Every post's front matter has a `category:` line with one of the category slugs in `src/data/blogCategories.ts` (`accounting-setup`, `bookkeeping`, `payroll`, `texas-taxes`, `quickbooks`; `texas-taxes` is shown as "Small business taxes"). The blog page groups posts by category, and the build fails if a post has no category or an unknown one.

## Rules for rewriting or humanizing existing posts

Rewriting the prose is fine. These parts are not prose and must stay as they are:

1. **File name.** Never rename the file; it is the page's URL and Google has indexed it.
2. **Front matter** (the block between the `---` lines). Leave `date` alone. `title` and `description` are what Google shows in results; only edit them if asked, and keep their target keywords (below).
3. **Headings.** Keep every `##` and `###` heading and their order. You may reword a heading's text, but keep its keyword and keep it in sentence case.
4. **Tables.** Keep every table, with the same rows, columns and numbers. You may reword cell text.
5. **Numbered steps and checklists.** Keep them as lists with the same number of items. Removing bold labels from list items is fine; turning a list into a paragraph is not.
6. **Links.** Keep every link and its exact target. Internal links end in a slash (`/bookkeeping/`, `/blog/catch-up-bookkeeping/`) and the booking link is `/#book`.
7. **Facts.** Keep every number, rate, threshold, deadline, form name and law exactly as written (for example $2,000, $2.65 million, 6.25%, May 15, January 31, Form 1099-NEC, Texas Payday Law). Do not add any new fact, number, statistic or claim.
8. **Saleh's voice and claims.** Posts are written in first person by Saleh. Keep "38 years of experience", "Weatherford, Texas" and "working online". Do not add services, prices or promises he hasn't stated.
9. **Closing section.** Keep the final call to action with its links to the service page and `/#book`.
10. **Disclaimer.** Keep the italic line at the end (`*This article is general information...*`) where a post has one.
11. **No em dashes or en dashes** in the text.

### Target keywords to keep in each post

| File | Keep these phrases |
|---|---|
| accounting-system-setup-guide.md | accounting system, small business, chart of accounts, QuickBooks Online |
| how-to-do-a-bank-reconciliation.md | bank reconciliation, reconcile your bank account, QuickBooks Online |
| biweekly-vs-semi-monthly-payroll.md | biweekly payroll, semi-monthly payroll, pay schedule, Texas Payday Law |
| cash-vs-accrual-accounting.md | cash vs accrual, cash basis, accrual accounting, cash method, accrual method |
| catch-up-bookkeeping.md | catch-up bookkeeping, behind on your books, reconcile |
| how-much-does-bookkeeping-cost.md | how much does bookkeeping cost, bookkeeping cost, a month, an hour |
| how-to-file-1099s-in-quickbooks.md | 1099s in QuickBooks, 1099-NEC, $2,000 threshold, W-9 |
| should-you-outsource-bookkeeping.md | outsource your bookkeeping, outsourced bookkeeping, remote bookkeeper |
| year-end-checklist-small-business.md | year-end checklist, small business owners, close the books |
| texas-franchise-tax-guide.md | Texas franchise tax, no-tax-due threshold, Public Information Report |
| texas-sales-tax-guide.md | Texas sales tax, sales tax permit, filing deadlines |
| bookkeeping-for-real-estate.md | bookkeeping for real estate, rental property, security deposits, depreciation |
| bookkeeping-for-restaurants.md | bookkeeping for restaurants, food cost, labor cost, sales tax |
| how-to-file-texas-sales-tax-online.md | file Texas sales tax online, Webfile, total sales, taxable sales |
| how-to-pay-quarterly-taxes-on-1099-income.md | quarterly estimated taxes, 1099 income, safe harbor, Form 1040-ES |
| how-to-pay-yourself-from-an-llc.md | pay yourself from an LLC, owner's draw, guaranteed payments, reasonable salary |
| how-to-read-a-profit-and-loss-statement.md | profit and loss statement, P&L, gross profit, net income |
| llc-vs-s-corp-texas.md | LLC vs S corp, Texas, Form 2553, self-employment tax |
| texas-payroll-taxes.md | Texas payroll taxes, Texas Workforce Commission, FUTA, Form 941 |
| what-is-a-chart-of-accounts.md | chart of accounts, account numbers, QuickBooks Online |
| what-is-cost-of-goods-sold.md | cost of goods sold, COGS, gross profit, QuickBooks Online |

### After rewriting

1. Run `npm run build` and confirm it succeeds.
2. Show the user what changed (`git diff`) before committing or pushing.
