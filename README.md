# Jekyll Links

This repository contains a self-hosted [Linktree](https://linktr.ee/)-style website using [Jekyll](https://jekyllrb.com/), [Cloudflare Pages](https://pages.cloudflare.com/), and [GitHub Actions](https://github.com/features/actions).
It is deployed to https://jeykll-links.pages.dev/.

## Local Development

The easiest way to develop locally is using [Docker Desktop](https://www.docker.com/products/docker-desktop/) (other container engines are available).

- Windows (cmd): `docker run -it --rm -v %cd%:/usr/src/app -w /usr/src/app -p 127.0.0.1:4000:4000 ruby:3.3.1 sh -c "bundle install && bundle exec jekyll serve --force_polling -H 0.0.0.0"`

Once the development server is running, the website will be available at http://localhost:4000/.
