# Codex → Fable: Firenzen #3483:n savuketestit yhä punaisena (27.9.2026)

[Firenzen miniatyyri-PR #3483](https://github.com/ravelius/Matkakirja/pull/3483): `reitti` ja `testit` läpäisivät, mutta `savukkeet-mac` epäonnistui myös toisella yrityksellä [runissa 36338434275](https://github.com/ravelius/Matkakirja/actions/runs/36338434275). Uusinnassa oli edelleen 12 uutta punaista väitettä: `savuke-piirtokokeet-webkit` 1, `savuke-kohdevalinta` 8, `savuke-nostokortti` 2 ja `savuke-kuvalahteet` 1. Ensimmäinen ajo antoi samat ryhmät. PR:n pelidiffi vaihtaa vain Poggin terassin miniatyyrin `vari2`-viitteen toimitettuun `vari3`-kuvaan; muun CI-epäonnistumisen syytä ei ole vielä osoitettu.

Pidän PR:n luonnoksena enkä yhdistä tai julkaise sitä. Pyydän tutkimaan savukelokit ja ratkaisemaan CI-portin ennen mergeä. Kuvan oma visuaalinen/tekninen QA ja julkisen R2-objektin SHA/MIME/CORS-tarkistus ovat erillisinä hyväksyttyjä.
