# UI-pohjien siirto: tila (Natiivi-UI johtaa; päivitetään erä kerrallaan)

Omistajan OK 1.10.2026 klo 11.17 kaikille 9 kohdalle (loki 258c8048b); tarkennus 11.37 (loki 4b60cee9f): ≤ 250 ms koskee vain
UI-siirtymiä. Suunnitelma ja säännöt: `ui-pohjat-kartoitus-20261001.md`. Sääntö: uusi pinta vain pohjilla, puute → Päätoimittajalle.

## Vaiheet

| Vaihe | Web (Pelikoodari / Natiivi-UI) | Natiivi (proto-git, Natiivi-UI) | Tila |
|---|---|---|---|
| 1 Tyylikirja + generaattori | #3780 `tyylikirja/tyylikirja.json`, `tools/tyylikirja.mjs`, `tests/tyylikirja.test.mjs` | `natiivi-ui/tyylikirja` c8cc5cb1: Tyylikirja.uss/.cs, tarkista.sh | junassa; laitteella 0,0–0,2 % ero muissa näkymissä |
| 2a KORTTI | #3782 (Pelikoodari) js/pohjat, css/pohjat.css, tyylikirja.html | `natiivi-ui/kortti-pohja` 3154330f: Kortti-USS tokeneista, apurahan otsikko | todennettu 9edb3854 |
| 2b NOSTOKORTTI | #3782 (+ kartan kohdenosto seuraavaksi) | `natiivi-ui/nostokortti-pohja` 486ea116: Pohja.cs, alareuna/sivukortti, vetokahva, hero 2:1, Esc | hero-korjaus odottaa käännöstä |
| 3 Pohjavahti | #3783 `tools/pohjavahti.mjs` + testi | `natiivi-ui/pohjavahti` d045f8d1: tyokalut/pohjavahti.py tarkista.sh:ssa | lähtötasot kirjattu |
| 2c maakuntakortti + kontrasti | – | `natiivi-ui/pohjat-2` 428eae09: Pohja.NostokortinPaikka + Vetokahva, keksintöpaneelin 2,2:1 | käännös ~12.50 |
| Perusta (natiivi) | – | `natiivi-ui/pohjat-perusta` 1b89dccd = 1–3 + Pohja.NostokortinPaikka/Vetokahva, sivukortti yläpalkin alle | merge-pyyntö Natiivisepälle 1.10. ~13.40 |
| Pinnat omina haaroinaan | Pelikoodari: kohdenosto web-pohjaan | `pohja-kohdekortti` 60e66e6c, `pohja-maakunta` 7275473b, `pohja-avauskortti` 6402bf4d | juna 99 (juna/b13 735aaf55); `kontrasti-keksinnot` PUDOTETTU: web on sama #6b4d1c (pariteetti = ei muutosta, Päätoimittaja 1.10.) |
| Pinnat 2. erä | #3789 ihmiskortti, #3791 maakunta, #3793 vahvistus (Pelikoodari) | `pohja-maakunta-2` 6ec07acb, `pohja-ihmiskortti` 75b6a05f (vaatii maakunta-2), `pohja-vahvistus` 8d7f605f (Kortti pohja: true) | todennettu ed7fa5a5, merge-pyynnössä 1.10. ~15.10 |

## Pinnat pohjiin (natiivi)

| Pohja | Siirretty | Seuraavaksi | Myöhemmin |
|---|---|---|---|
| NOSTOKORTTI | nostokortti, kohdekortti (Kysy · Visa · Kierros · Lehti), maakuntakortti (Kysy), avauskortti, ihmisen matkan kortti (TUMMA, Kysy · Lue lisää) | nähtävyysarkki | nähtävyysarkki, kartuscha, kaupunkiliuska |
| KORTTI | tokenit kaikkiin Kortti-dialogeihin; uusi ulkoasu (Kortti pohja: true, web #3793): vahvistus | kysymys/visa (web ensin), paljastus, sitten muut Kortti-dialogit yksi kerrallaan | minipopup, sähketehtävä |
| PANEELI | – | pillerivalikko (jo 38 pt), äänentasot, laukku | linssin hampurilainen, selitteet |
| KUVANÄKYMÄ | – | kuvasuurennos, astronautin kuvanäkymä | julistegalleria, kohdekartan kokoruutu |
| LUKUARKKI | – | lehti (sulku-Esc on jo), wiki, tiedeliite | opas, vertailuarkki |
| LINSSIN OHJAIN | – | Esc kaikkiin linsseihin, kamera (Linssiseppä 2) | radio, vuosi, ISS-pöytä, kuunnelma, mikseri |
| PULU | – | chat-teema tokeneista, valinta- ja opetustaulu samaan rakenteeseen | – |

## Avoimet

- Vetokahvan veto: korjaus `natiivi-ui/kahva-veto` cd3f9946 (osoittimen kaappaus) junassa 100 (73669b8f), huomisen TF = BUILD 100; todennus proto-3d/lokit/natiivi-ui-pohjat/vetotesti/.

- Ei saavutettavuusperusteisia näkyviä muutoksia (omistajan Ydinajatus): tyylikirjan kontrastiehto poistettu (web a5b06c422 #3783, natiivi `natiivi-ui/tyylikirja-2` 850be8c8 seuraavaan junaan).

- Webin `--kulta` on määrittelemätön (var(--kulta, #eab84e) / #d9a13b / ilman varaa): Pelikoodari yhtenäistää KORTTI-siirrossa.
- Kuollut koodi (taikalasit-nappi, Muut-paneeli, .mk-minipuluKortti*, USS-tuplat) poistetaan kunkin pinnan siirrossa.
- Pohjagalleria (`ui pohjat`) Akropolis-datalla (web js/pohjat/tyylikirja-sivu.js TKS_PERUS, TKS_KUVAT) savukkeen kuvaregressioon.
