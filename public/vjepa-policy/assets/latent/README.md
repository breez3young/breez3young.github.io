# Future latent visualisation

The paired rows show one successful OSMesa LIBERO rollout from the DROID-initialized V-JEPA 2.1 ViT-L policy. Each row contains the observed context latent followed by four predicted future latent steps for the main (agentview) and wrist cameras.

Both cameras, context, and future steps share one PCA basis, fixed component orientation, and one robust color range. Tokens are enlarged with nearest-neighbor interpolation so the 14×14 patch grid remains discrete. Each token is layer-normalized as in the latent prediction target used during policy training. Colors show latent features; they are not RGB reconstructions.
