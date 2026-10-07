# TILANNE: lähdetarkistus (Kielletty kaupunki 1923 ja Giza) — keskeytetty 7.10.2026

Päätoimittajan tilaus 7.10.2026: lähdetarkistus kahteen faktapohjaan, jotka kirjoitettiin
ilman pääsyä lähdesivuille. Omistajan päätös (5 tunnin raja) keskeytti työn kesken.
Haara: `fable-lahdetarkistus-kk-giza` (pohja: `origin/main`).

## Mitä on tehty

1. **Haara luotu** `origin/main`-pohjalta.
2. **Verkon tila todettu** (tämä on tarkistuksen kannalta oleellinen havainto): ajoympäristössä
   verkko on nyt auki. Testatut vasteet:
   - `https://en.wikipedia.org/wiki/Diary_of_Merer` → **200**
   - `https://content.time.com/time/magazine/article/0,9171,716092,00.html` → **302** (uudelleenohjaus;
     `time.com/archive/...` on seurattava)
   - Commons-API (`commons.wikimedia.org/w/api.php`) → **429** (kiintiöraja; toimii tauolla,
     ei estetty)

   Eli kummankin faktapohjan oma AINEISTORAJOITE-varaus ("yhtään lähdettä ei avattu",
   "verkkoesto") ei enää päde ajoympäristöön, ja tarkistus on tehtävissä loppuun.
3. **Luettu ja kartoitettu** tarkistettavat kohdat:
   - `docs/raportit/faktapohja-kielletty-kaupunki-1923.md`: osio 1 (kohdat 1–12), osio 10
     (E1–E25), osion 10 lopun lista "Tarkistettava Macilla (verkko auki)" ja osien väliset
     ristiriidat (22 kohtaa).
   - `docs/raportit/faktapohja-giza-kulta-aika.md`: osio "Rakennustyömaan hetki: päätelmät",
     "Tärkeimmät korjaukset" ja osio 6 (E1–E74, yhteenvetotaulukko + perustelut).
   - Malli: `docs/raportit/olavinlinna-tietokerros-lahdetarkistus.md` ja
     `faktapohja-olavinlinna-1500.md` (lopun "Epävarmojen tarkistus").
4. **Neljä Opus-ali-agenttia käynnistetty** rinnakkain (työnjako alla) ja **pysäytetty**
   omistajan päätöksellä, ennen kuin yksikään ehti kirjoittaa raporttiaan.

## Mitä EI ole tehty

- **Kummankaan faktapohjan sisältöä ei ole muutettu.** Osiota
  "Lähdetarkistus 7.10.2026 (sivut avattu)" ei ole vielä kirjoitettu kumpaankaan tiedostoon.
- Yhtään `[KORJATTU 7.10.]`-merkintää ei ole tehty.
- TARKISTAJA-agentin läpikäyntiä ei ole tehty (ei ollut mitään tarkistettavaa).
- **Yhtään tulosta (vahvistui / korjattu / jää epävarmaksi) ei siis ole vielä olemassa.**
  Agentit ehtivät vain ladata lähdeaineistoa session väliaikaiskansioon, joka katoaa
  kontin mukana; mitään päätelmää niistä ei ehditty kirjata eikä mitään ole committoitu.
  Aiempaa tulosta ei saa lukea tästä haarasta, koska sitä ei ole.

## Mistä jatketaan

Käynnistä sama neljän Opus-agentin erä uudelleen (enintään 4 rinnakkain), sitten erillinen
TARKISTAJA-agentti. Agenttien työnjako oli:

| Agentti | Vastuu | Keskeiset kohdat |
|---|---|---|
| A (KK palo) | Jianfugongin palo ja tuhoutuneet esineet | E1–E10, E23, E24; Time 1923 (molemmat artikkelit ja niiden päiväykset), Palatsimuseon PDF, Puyin muistelman luku 遣散太监, palaneiden rakennusten nimet |
| B (KK eunukit ja henkilöt) | Eunukkien karkotus 16.7.1923 ja henkilöt | E11–E22; Puyi (17 v, Yangxindian), Wanrong (16 v, Chuxiugong), Wenxiu (13 v, Changchungong), Johnston (48 v, *Twilight in the Forbidden City*), Pujie-vienti 13.7.1922 |
| C (Giza Merer ja ajoitus) | Mererin päiväkirja ja Khufun ajoitus | E1–E13; Tallet & Marouard (MIFAO 136, 2017), *The Red Sea Scrolls* (2021), Dakhlan kalliokirjoitus, venekuopan "14. laskenta", Mererin titteli (sḥḏ) |
| D (Giza kylä, satama, tulva) | Työläisten kylä, satama, arki | E14, E17, E33–E37, E57–E70; AERA / Heit el-Ghurab, Wall of the Crow, Ro-She Khufu, PNAS 2022 (Nile waterscapes), märkä hiekka (Djehutihotep) |

Jäljellä olevat ja agenteille vielä jakamattomat kohdat (toinen erä):
- KK: E25 (Commons-lisenssit, kaikki osan C kuvat #1–#28 + `File:TaitaiWanRongJohnston.jpg`),
  osio 4 (Qianqingmenin raja, Guwu chenliesuo, restauroidut palatsit).
- Giza: E15, E18, E21, E27, E28, E53, E54, E55 (kuvalisenssit ja yksilähteiset kohdat).

### Lopputuotteen muoto (ei vielä kirjoitettu)

Kummankin tiedoston loppuun osio **"Lähdetarkistus 7.10.2026 (sivut avattu)"**, jossa
jokaisesta kohdasta: alkuperäinen väite, tulos (vahvistui / korjattu / jää epävarmaksi),
avattu lähde (URL + sivu tai kohta) ja tarvittaessa pelin käyttöohje. Tekstiin korjataan
vain selvät virheet, merkintä `[KORJATTU 7.10.]`. Muita tiedostoja ei muokata, PR:ää ei
avata eikä mergeä tehdä.

**Huom. "vahvistui" vaatii avatun sivun** — hakutiivistelmä ei riitä, koska juuri se on
näiden kahden faktapohjan alkuperäinen puute.
