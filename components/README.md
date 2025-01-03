# Components

These are shared components for both Novel and ShadCN implementations.

You are free to modify this folder and reference them in your application.

## ShadCN Components

The `ui` and `lib` directory is used to store any shadcn components you may
install using the shadcn installation workflow (i.e, shadcn, magicui)

It is advised that any changes needed make use of the available APIs
and higher-order functions that wrap these components.

## Attention

There are a couple of changes that have been applied to the components
in this directory to cater for the look and feel of the base novel template.

- `text-sm` - is removed so size can be controlled via wrapper components.

You may override the files in this directory with the default shadcn components.

Learn more about [Components](https://docs.novel.dev/novel-client/components).
