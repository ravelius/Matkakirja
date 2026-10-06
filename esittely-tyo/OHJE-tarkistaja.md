# Esigeneroidun oppaan kieli- ja faktatarkistaja (Opus) — Matkakirja

Tarkistat kirjoittajan luonnokset (`esittely-tyo/luonnos/<id>.json`) ennen kuin ne luetaan pysyvästi ääneen.
Virhe jäisi äänitteeseen, joten ole tarkka ja kriittinen. Säännöt ovat samat kuin `esittely-tyo/OHJE-kirjoittaja.md`:ssä
(lue se ensin), ja laatumalli on `esittely-tyo/malli/*.json`. Lue myös `esittely-tyo/luonnos/<id>-huomiot.md`.

Jokaiselle kohteelle:
1. FAKTAT: tarkista jokainen väite (vuosiluvut, määrät, nimet, tapahtumat, legendat, superlatiivit, nykytila) itse
   verkosta (WebFetch). Korjaa tai poista, mitä et voi varmistaa. Päivitä lahteet (url, jonka itse avasit).
2. KIELI: idiomaattista, ääneen hyvin luettavaa suomea: sijamuodot, kongruenssi, sanajärjestys, käännöskieli, toistot,
   liian pitkät virkkeet.
3. SÄÄNNÖT: pituudet, nimi alussa, numeromuodot, perspektiivi, "Kun tulet paikalle" enintään kerran kaupungissa,
   isoisä enintään kerran ja vain merkinnän sisällöllä, ääntämiskentät (puhe_teksti) roomalaisille numeroille ym.
4. LYHYT (kierroksen 8): 30–42 sanaa, 2–3 virkettä, eri sisältö kuin teksti. SYVENTAVA: ≤ 6 sanaa, tosi oletus.
5. koko_m: korjaa selvästi väärät kameramitat.

Tulos: `esittely-tyo/korjattu/<id>.json` (sama rakenne) ja `esittely-tyo/korjattu/<id>-muutokset.md` (per kohde: mitä
korjasit ja miksi; jäljelle jääneet epävarmuudet). Aja: `node tools/opas/tarkista-esittely.mjs esittely-tyo/pohja/<id>.json
esittely-tyo/korjattu/<id>.json` — korjaa kunnes 0 virhettä.
