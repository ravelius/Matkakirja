## 2026-10-13 — Tilaus #95: kolme viivakuvaketta korjattu

Kolikko on nyt pyöreä suoraan edestä: ulko- ja sisärengas sekä yleinen kruunun kohokuvio. Julisteessa on kaksi vuorenhuippua ja aurinko ilman tekstirivejä. Matkamuisto on lumisadepallo jalustalla ja hiutaleella. Kaikki kolme on piirretty alusta tätä korjausta varten.

Toimitus: `posti/kuvakkeet-20261013-korjaus/`. Sisältää kolme SVG:tä, `bodies.json`, C#-sisällöt, vaalean ja tumman esikatselun sekä yhdistelmäarkin, QA:n ja provenienssin. Ei vaihtoehto-b:tä: riippumaton tarkistus hyväksyi lumisadepallon tunnistettavuuden.

QA: 30 rasteritarkistusta (3 kuvaketta × 5 kokoa 48/24/20/22/28 × 2 taustaa), ei tyhjiä tai leikkautuvia renderöintejä. SVG-rakenne, kääreet ja C#-sisällön vastaavuus tarkistettu. Riippumaton visuaalinen QA hyväksyi nykyiset SVG-SHA:t. ViewBox 0 0 24 24, currentColor, viiva 1.75, pyöreät päät ja liitokset, fill none; ei täyttöluokkaa, tekstiä, transformeja tai dasharrayta.

Lähde: `posti/fable-codex-kuvakkeet-korjaus-20261013.md`, commit ed9b409765b85579c3a531841ae8bb241a449dbc, blob bd6c761ba7b999ea11169e214f7b5182d9c691f0. #92:n aiempi 64/64 toimitus 1b4cacb49da2a1ce1054a08aeefc8aee19ceb42a säilyy historiassa. Tämä erä korvaa vain kolikon, julisteen ja matkamuiston. Muita kuvakkeita ei tuotettu uudelleen. Kuvagenerointikutsuja 0.

Omistajan erillistä kuvahyväksyntää ei edellytetä aiemman valtuutuksen mukaisesti. Natiivi-UI kytkee nämä peliin; runtime-integraatiota tai julkaisua ei ole varmennettu tässä toimituksessa.
