# 1.0.38-juna (e12c3d53) savuke: PASS (Laitetestaaja, 28.9.2026 klo 19.2x)

iPhone 18 Pro (1572C658). Sisältö BUILD 37:n jälkeen: Maapallon vuosi -linssi (kehittäjätilassa),
maakuntakartta (uusi napauta-kartalta-valinta), kyydin-taivas-korjaukset, ISS-nopeutus (LIVE/10×/
100×/1000× + "Lennä kohteen ylle").

## Testattu

1. **Maakuntakartta (uusi UI, korvasi Nostot/Maakunnat-välilehdet):** karttaselitteen nappi
   (☰-rivin vasen kuvake, 372×98 pt) on nyt kytkin. Päälle: hint "Napauta maakuntaa kartalla."
   HUOM: ensimmäiset napautukseni (rannikko/meri-alueet ja karkeat pisteet) EIVÄT osuneet mihinkään
   maakuntaan — ei virhettä, vain hiljainen ohilyönti (sama tuttu ilmiö kuin aiemmin koordinaatti-
   sudenkuopissa: tarkka osuma vaatii kiinteän maa-alueen). Osui mantereen sisäosaan (Thessalia):
   VAIN Thessalia värjäytyi (`VainKorostetut` toimii, muut maakunnat värittömiä), paneeli näytti
   nimen, kuvan (Meteora) ja tekstin oikein. **PASS.**
2. **Maapallon vuosi -linssi (uusi, vain kehittäjätilassa):** `linssi maapallon-vuosi` avautui,
   6 kerrosta listalla (ndvi, lumi, sst, sade, pilvet, palot). Kuukauden vaihto (`vuosi kk 1`)
   ja kerroksen vaihto (`vuosi kerros ndvi`) toimivat, molemmat latautuivat täyteen (t 1,00).
   Globe pyörii itsestään, UI (kuukausiliukusäädin, kerrosvalikko, peittoliukusäädin, lähderivi)
   näyttää oikein. **PASS toiminnallisuudelle.**
   **HUOM/löydös (ei varmistettu bugiksi):** NDVI-kerroksella (tammikuu) näkyi outo pyöreähkö
   oranssi/keltainen läiskä Kyproksen/Lähi-idän kohdalla — ei näyttänyt tasaiselta kasvillisuus-
   gradientilta vaan pikemminkin laattarajalta/artefaktilta. Pysyi samassa maantieteellisessä
   kohdassa pallon pyöriessä (ei kiinteä ruudulla), joten se on pallon pinnalla eikä UI-virhe,
   mutta muoto on epäilyttävä. Ei ehditty tutkia juurisyytä — kuvakaappaus voi auttaa
   Linssiseppä 2:ta arvioimaan onko kyse oikeasta NDVI-datasta (esim. kastelluista alueista
   aavikon keskellä) vai laattaladonnan virheestä.
3. **ISS-nopeutus:** `astro kyyti nopeus 100` → aika eteni oikeassa suhteessa (2 s reaaliaikaa ≈
   3,3 min simuloitua, 100×:n mukainen), UI-porras "Palaa LIVE · 10× · 100× · 1000×" näytti oikean
   valinnan korostettuna, LIVE-merkki muuttui "100×"-merkiksi oikein. Kuu näkyi taustatähdissä.
   Nollattiin `nopeus 1`:llä, poistuttiin siististi (`astro kyyti pois`, `linssi pois`). **PASS.**
4. **Ei virheitä/poikkeuksia** peli- tai linssi-lokissa koko kierroksen aikana (vanhat aiemman
   kierroksen rivit säilyneet samassa tiedostossa, mutta ei uusia).

## Tulos

**PASS.** Kaikki neljä uutta ominaisuutta toimivat perustasolla ilman kaatumista. Yksi ei-blokkaava
visuaalinen löydös Maapallon vuosi -linssin NDVI-kerroksessa (katso yllä) — kannattaa tarkistaa,
mutta ominaisuus on vain kehittäjätilan takana eikä estä tätä junaa.

Simulaattori sammutettu.
