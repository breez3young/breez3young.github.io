# Paper figure sources

The figures displayed on the project page are SVG exports of the original PDF artwork used by the LaTeX paper. The source PDFs are copied unchanged into `originals/` and linked directly from each displayed image. Vector conversion uses Poppler `pdftocairo -svg`; text and diagram geometry are preserved, with embedded raster imagery retained where the original PDF contains it. These files are not crops of compiled manuscript pages.

| Website figure | LaTeX source |
| --- | --- |
| `fig1_method.svg` | `figures/V-JEPA-Policy-zy-v1.pdf`, included by `secs/method.tex` |
| `fig2_transfer.svg` | `figures/q3_transfer_combined.pdf`, included by `table/Q3-table.tex` |
| `fig3_platform.svg` | `figures/Tianji.pdf`, included by `secs/appendix.tex` |
| `fig4_real_world_tasks.svg` | `figures/real-world-tasks.pdf`, included by `secs/appendix.tex` |
| `fig5_pareto.svg` | `figures/pareto_frontiers.pdf`, included by `secs/appendix.tex` |

`sources.json` records the figure mapping and SHA-256 checksums of the unchanged original PDFs. The paired latent visualization and video posters remain the experiment assets provided with this version of the website.
