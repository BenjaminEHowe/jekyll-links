# Jekyll Links

[![Jekyll Badge](https://img.shields.io/badge/Jekyll-C00?logo=jekyll&logoColor=fff&style=flat)](https://jekyllrb.com/)
[![Cloudflare Pages Badge](https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflarepages&logoColor=fff&style=flat)](https://pages.cloudflare.com/)
[![GitHub Actions Badge](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=flat)](https://github.com/features/actions)

This repository contains a self-hosted [Linktree](https://linktr.ee/)-style website. It is deployed to https://jeykll-links.pages.dev/.

## Local Development

The easiest way to develop locally is using [Docker Desktop](https://www.docker.com/products/docker-desktop/) (other container engines are available).

- Windows (cmd): `docker run -it --rm -v %cd%:/usr/src/app -w /usr/src/app -p 127.0.0.1:4000:4000 ruby:3.3.1 sh -c "bundle install && bundle exec jekyll serve --force_polling -H 0.0.0.0"`

Once the development server is running, the website will be available at http://localhost:4000/.
