# Natiivi-UI: luovutus 10.11.2026 klo 01.55 (kontekstivahti 25 %; korvaa -20261110-0030:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870,
VS local_5ebb0658-96f6-434d-8a38-b122eb53032f. Tarkistus `sh Linssit-testit/unity-tarkistus.sh` (worktreessä). Skenaariot
/Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/.

## 1. Valmiit ja kuitatut (ei jatkotoimia)
- Tulivuoren latausilmaisin dc0c548c2 (palkille tk-teema-tumma, nimelle Latauskuva.Luettava): PT kuittasi junaan 224, NS yhdistää haaraansa.
- ISS:n sulkupoikkeukset 55c1fdb49 (Revontulet.cs null-vartijat + AstronauttiKerros.Pois `if (this != null) Destroy`): JU yhdisti, juna 224 = 9cc59f92f.
  Valoseppä saanut tiedoksi (Revontulet.cs on VS:n).

## 2. ODOTTAA KS:N DATAA: hetkien Pulu-kysymykset 2b7f2e7b7 (KK kelpuutti 03.2x, PT: junaan vasta KS:n datan kanssa)
- Haara natiivi-backup natiivi-ui/hetki-pulu (juna-224 9cc59f92f + 2), worktree /Users/Shared/Claude/wt/proto-nui-hetki.
- NostoSisalto.Hetki lukee kysymykset (≤ 3); Nostokortti: hetkelle Kysy pululta -lohko visan jälkeen; PuluValmiitLataus.Kohta hetki:<id>.
  QA: `ui nostokysymykset <valo> k1|k2|k3 | pois`, `ui nosto - <nappi>`, nappi `loppuun`. Testi HetkiKysymyksetTestit 3/3.
- Raportti ja parit: lokit/nui-hetki-pulu-2-iphone-2b7f2e7b7/raportti-nui.md, pari-1..3. Ei jatkotoimia ennen PT:n viestiä datasta.

## 3. SEURAAVA ERÄ (PT 03.2x, KK:n havainto) — ALOITTAMATTA
Nostopalkki (Pinnaus.cs, kiinnitetty nosto kartan yllä) vaihtaa asettelua kesken saman käännöksen ja kortin:
- lokit/nui-hetki-pulu-2-iphone-2b7f2e7b7 pari-1: e-1 = otsikko 2 rivillä + "Pariisi ▾ ›" SAMALLA rivillä; j-1 (34 s myöhemmin) = otsikko 1 rivillä,
  kaupunkirivi ALLA. pari-3: molemmat jälkimmäisessä muodossa.
- Vihje lokista (unity.log samassa kansiossa): ensimmäisellä kerralla järjestys "kiinnitetty automaattisesti" (2415) → "kaupungin nimi palkissa Pariisi" (2447,
  32 riviä myöhemmin); myöhemmin "kaupungin nimi palkissa" ENNEN "kiinnitetty" (3184/3185). Epäily: palkin asettelu valitaan sen mukaan, onko
  kaupungin nimi jo palkissa rakennushetkellä (tai ensimmäisen mittauksen leveys ennen GeometryChangedia). Ensimmäisessä kuvassa myös "‹" näkyy himmeänä.
- Tehtävä: selvitä syy, yksi vakaa asettelu (KK:n valinta ei tiedossa: kysy PT:ltä, kumpi on oikea, jos ei selviä Raamatusta/aiemmista päätöksistä),
  pari ennen/jälkeen iPhone-koossa PT:lle (Mac iPhone pysty JU:n vuorolla; skenaarion pohja sk-hetki-pulu-2.txt: avaa sama nosto kahdesti).

## 4. Jono tämän jälkeen
- Tyhjä → rivi PT:lle "JONO TYHJÄ: NUI".
