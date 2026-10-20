# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus (siirto)

21.9.2026 n. klo 09.36 Suomen aikaa. **Poikkeusluovutus**: omistaja
päätti kesken kierroksen 22 siirtää koko kehitystyön uuteen Macin
käyttäjätiliin, hakemistoon `/Users/Shared/Matkakirja/`. Tämä
raportti kirjataan siksi kesken jääneenä — edellinen täysi luovutus
on `docs/raportit/viesti-laitetestaaja-luovutus-20260921.md`, lue se
myös.

## Mitä ehdittiin

- Kierros 22 osittain, v1987:llä (v1988 tuli tuotantoon vasta aivan
  lopussa, ei ehditty testata): `docs/raportit/laitekierros-
  22-20260921.md`. Nimiöt pan/zoom OK, kaupunkiliuska OK, joet/meri
  OK, maakuntanimet todennäköisesti OK (ei täyttä varmuutta
  Alsacesta). Kartuschan tap-through-testi epäselvä — satunnaiset
  valokuvakortit peittävät lähes joka napautuksen kartalla, ei vain
  saapumisnäkymässä kuten aiemmin luultiin. "Liiku"-nappi edelleen
  kuollut simulaattorin synteettiselle kosketukselle.
- iPad Pro 11" (M5) -lupa saatiin omistajalta AskUserQuestion-
  kortilla TÄSSÄ istunnossa (21.9. n. klo 09.34) huntu- ja
  ESP/DEU-testejä varten, mutta iPadia ei ehditty käynnistää eikä
  käyttää — siirto tuli välittömästi luvan jälkeen.
- Fablen pyytämää sulavuusmittausta (kehysväli/fps panoroinnissa ja
  zoomissa, iPad+iPhone, Pelikoodarin mittari
  `matkakirja.ui.pallolauta.sulavuus.aloita()`/`.yhteenveto()`,
  haara `pelikoodari-nimiot-sulavat`) **EI aloitettu lainkaan** —
  viesti ehti tulla vasta juuri ennen siirtopäätöstä.

## Kesken seuraavalle sessiolle (uudessa käyttäjätilissä)

1. **Sulavuusmittaus ensin** (omistajan sitova päätös 21.9.: "kartan
   sulavuus ensin, kierros 22 vasta tämän jälkeen"). Ks. Pelikoodarin
   ohje yllä — mittaa iPadilla (ja mielellään iPhonella) sekä
   panorointi että nipistyszoomi Ranskan pallolaudalla Marseillessa,
   raportti `docs/raportit/laitemittaus-sulavuus-20260921.md`,
   lähetä tulos Fablelle (≤ 8 riviä) JA suoraan Karttasepälle ja
   Pelikoodarille.
2. Sen jälkeen kierros 22 loppuun: löytämisen sumu (v1988, pitäisi
   olla nyt tuotannossa), kartuschan tap-through uudelleen
   (rauhallisemmin, väistäen satunnaiskortit tai tunnistaen ne
   erikseen), uusi pyramidi tarkemmin.
3. Luovutuksen `docs/raportit/viesti-laitetestaaja-luovutus-
   20260921.md` "Kesken"-lista on yhä ajan tasalla (huntu pitkällä
   lennolla, ESP/DEU yksi zoomitaso, nostotaso 3, suurennoksen
   selausnuoli) — iPad-lupa on nyt myönnetty kertaalleen, mutta
   **pyydä se uudelleen uudessa käyttäjätilissä/sessiossa**, koska
   lupa on todennäköisesti sidottu Mac-käyttäjätiliin/simulaattorin
   ajoympäristöön eikä siirry automaattisesti.

## Ympäristö

- Vanha työkansio `/Users/samireivinen/Matkakirja-sonnet` (worktree,
  haara `laitetestaaja`) — **tarkista uudessa käyttäjätilissä onko
  tämä sama polku käytössä vai onko worktree perustettava uudestaan
  `/Users/Shared/Matkakirja/`-hakemiston alle.**
- Simulaattorit sammutettu: iPhone 18 Pro sammutettu tässä
  sessiossa, ilmoitettu Julkaisijalle "simulaattori pois". iPad Pro
  11" (M5) oli jo valmiiksi sammutettuna, ei koskettu.
- Ei koskettu avaimiin.

## Aloitusviesti seuraavalle Laitetestaaja-sessiolle

```
Olet Laitetestaaja (Sonnet) — Matkakirjan iOS-simulaattori ja
laitekierrokset. Repo: ravelius/Matkakirja. UUSI työkansio:
/Users/Shared/Matkakirja/<oma-alikansiosi> (tarkista tarkka polku
Fablelta tai omistajalta, ei ollut vielä tiedossa tätä
luovutusta kirjoittaessa).

Lue: CLAUDE.md, docs/roolitus.md, TÄMÄ raportti kokonaan,
docs/raportit/viesti-laitetestaaja-luovutus-20260921.md (edellinen
täysi luovutus, "Kesken"-lista yhä voimassa).

Sitovat säännöt: agentteina vain Opus/Sonnet; raportoi Fablelle vain
gitillä (tiedosto + polku viestinä, ei AskUserQuestionia paitsi
laitelupiin); ilmoita Julkaisijalle "simulaattori päällä"/"pois"
aina kun käynnistät tai sammutat; yksi simulaattori kerrallaan; älä
mergee äläkä nosta versiota itse. Vastaa suomeksi, tiiviisti.

ENSIMMÄINEN TEHTÄVÄ (omistajan sitova päätös 21.9.): mittaa kartan
sulavuus oikealla iPad-simulaattorilla (pyydä lupa
AskUserQuestion-kortilla) ennen kuin jatkat kierrosta 22 — ks. tämän
raportin "Kesken seuraavalle sessiolle" -kohta 1 Pelikoodarin
mittausohjeineen.
```
