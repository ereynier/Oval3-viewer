<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ereynier/Oval3-viewer">
    <img src="img/Oval3-Viewer-logo-2.png" alt="Logo" width="150" height="">
  </a>

<h3 align="center">Oval3 Viewer</h3>

  <p align="center">
    A Next.js web app that allows you to explore Oval3 cards by their owners, view their stats, and filter them based on various criteria.
    <br />
    <a href="https://github.com/ereynier/Oval3-viewer"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://oval3viewer.ereynier.me">View Website</a>
    ·
    <a href="https://github.com/ereynier/Oval3-viewer/issues">Report Bug</a>
    ·
    <a href="https://github.com/ereynier/Oval3-viewer/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://oval3viewer.ereynier.me)

The web app is a simple way to explore the Oval3 cards by their owners. You can filter the cards by their stats, and see the cards' details by clicking on them. It use a JSON file to store the cards and owners datas created by the scripts in the `./scripts` folder. Some datas can be wrong or missing due to the way the scripts are working. You can find a further explanation in this article: [English](https://ereynier.medium.com/oval3-viewer-c7551edd20ff) / [French](https://ereynier.medium.com/8ebad02c0793).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TailwindCSS][Tailwindcss]][Tailwindcss-url]
* [![Viem][Viem.sh]][Viem-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Next.js: follow the [official documentation](https://nextjs.org/docs/getting-started) to install Next.js

### Installation

#### To run the app

1. install the dependencies
   ```sh
   pnpm install
   ```
2. Set the ENV variables
   ```sh
   cp .env.example .env.local
   ```
   Then fill the `.env.local` file with the required variables

3. Run the development server
   ```sh
   pnpm next dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In the `./scripts` folder, you can find some scripts to get the cards by address and save them in a JSON file.

1. `./scripts/GetOwners.ts` will get the owners of the cards and save them in a JSON file one time.
    ```sh
    cd scripts
    tsc GetOwners.ts
    node GetOwners.js
    cp data.json ../utils/datas/owners.json
    ```
2. `./scripts/TransferListener.ts` will listen to the transfer events and save the cards in a JSON file every time a transfer event is detected. (It will update data.json, not owners.json)
    ```sh
    cd scripts
    tsc TransferListener.ts
    node TransferListener.js
    ```
3. In `.env.local` set `DATA_SOURCE` to `JSON`.

The app can use a database to store the datas, you can find the scripts to fill the database in this repository: [https://github.com/ereynier/oval3-Owners](https://github.com/ereynier/oval3-Owners)
1. In `.env.local` set `DATA_SOURCE` to `DB`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Go on the application URL and enter the address you want to check. You can also use the filters to find the cards you want to see.

Here's a short list of addresses with cards:
- 0xBbBfc940ddF3222Cd01168D838dFA2cDe78947D3
- 0xBDb1c31b8e8e61E85Bb5F3efD56e992e7E50af3e
- 0x6a8319C56707a0d9E6F1e44cD277757aE5562835

_For a more detailed example, check the demo [video](https://youtu.be/QZEtW3I7qQI)_

[<img src="img/oval3viewer minia.jpg" width="500"
/>](https://youtu.be/QZEtW3I7qQI)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/ereynier/Oval3-viewer/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Estéban Reynier - [@EstebanReynier](https://twitter.com/EstebanReynier) - esteban@ereynier.me

Project Link: [https://github.com/ereynier/Oval3-viewer](https://github.com/ereynier/Oval3-viewer)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Oval3 game](https://oval3.game)
* [Next.js](https://nextjs.org/)
* [TailwindCSS](https://tailwindcss.com/)
* [Shadcn-UI](https://ui.shadcn.com/)
* [Aceternity-UI](https://ui.aceternity.com/components)
* [Radix-UI](https://www.radix-ui.com/)
* [Viem.sh](https://viem.sh)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ereynier/Oval3-viewer.svg?style=for-the-badge
[contributors-url]: https://github.com/ereynier/Oval3-viewer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ereynier/Oval3-viewer.svg?style=for-the-badge
[forks-url]: https://github.com/ereynier/Oval3-viewer/network/members
[stars-shield]: https://img.shields.io/github/stars/ereynier/Oval3-viewer.svg?style=for-the-badge
[stars-url]: https://github.com/ereynier/Oval3-viewer/stargazers
[issues-shield]: https://img.shields.io/github/issues/ereynier/Oval3-viewer.svg?style=for-the-badge
[issues-url]: https://github.com/ereynier/Oval3-viewer/issues
[license-shield]: https://img.shields.io/github/license/ereynier/Oval3-viewer.svg?style=for-the-badge
[license-url]: https://github.com/ereynier/Oval3-viewer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ereynier
[product-screenshot]: img/Oval3-Viewer.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
[Viem.sh]: https://img.shields.io/badge/Viem-000000?style=for-the-badge&logo=Ethereum&logoColor=EEEEEE
[Viem-url]: https://viem.sh/