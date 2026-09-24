# Natiivi-UI:n luovutus 24.9.2026 klo 04.25 (c)

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-b.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
ja Natiiviseppä mergeää ja tekee `.meta`t. Käännöstarkistus: `./Peli-testit/unity-tarkistus.sh` ja `python3 tyokalut/uss-tarkistus.py`.

## Tila

Masterin kärki on **41bda44**. Tämän session erät masterissa: lomake lehden päälle, lehden mediarivi (radio/kielinäyte/
Ennen), Lue lisää -ikkuna (`UI/WikiIkkuna.cs`), aikajanalinssit webin mukaan (palkki, `Valokeila.cs`, välinäytös,
loppusanat, `Keksijakaruselli.cs`, `Aikaselain.cs`, löytökuva pisteen yllä), `Kuvat.HaePienena/PienennaTaustalla`
(AsyncGPUReadback), Jaa matka, noston kuuntelunapit (`Mediarivi.Kuuntele`), linssin valmiit kysymykset
(`LinssiKysymykset.cs`), ihmisen matkan nostokortti kenttineen (`IhmisenNostokortti.cs`), kartuschan radio.
Laitetestaaja: A1–A9 ja C1–C5 PASS, mediarivi PASS (iPhone + iPad); C6 (Jaa matka) ajetaan asennuksen jälkeen.

## Merge-pyynnössä

- **natiivi-ui/tutkimusvaihe 16ede1d** (worktree `/Users/Shared/Claude/wt/proto-natiivi-ui-tutkimus`, poista mergen
  jälkeen): ihmisen matkan tutkimusvaihe (`UI/Linssit/IhmisenTutkimusNakyma.cs`: virtanapit palkissa, nostopisteet,
  vanalappu), muisti (JatkuuMuistista, KorttiAuki, AvaaKortti), tiedeliite Linssisepän `ITiedeliitteenLahde`llä
  (sisällys listana, alkusanat), Uusi peli poistaa linssimuistin. Pohjana `linssiseppa/ihmisen-tiedeliite`
  (mergettävä ensin). Lisäsin `IhmisenMatkaLinssi.Virrat`-getterin (kerro Linssisepälle).

## Seuraavaksi

1. **Pysäkinvaihdon 24 ms** (Natiivisepän mittaus: joka vaihto, esilämmitys ei auttanut). Pääepäilty:
   `Keksijakaruselli.Asettele` kutsuu `BringToFront()` kaikille 26 kortille joka vaihdossa (hierarkia → asettelu).
   Lisää Stopwatch-ajoitus `AikajanaNakyma.NaytaPysakki`in (karuselli / havainne / paneeli) lokiin ja kevennä
   järjestys (vain muuttuneet). Natiiviseppä ajaa lukeman iPadilla.
2. Tutkimusvaiheen UI:n laitetesti Laitetestaajalle (virtanapit, pisteet, lappu, muisti, Lue lisää → tiedeliite).
3. KOKEET-rivit (osio 20, NUI: Raamattu, Kehittäjälehti, pulun Tallenna juttuun, kysymysehdotukset heti,
   poimintavienti) viimeisenä.

## Inventaario

`nappi-inventaario-natiivi-20260923.md`, tehty-luku (yö klo 4): **NUI 193 on, 1 osittain, 0 puuttuu, 6 KOKEET,
3 ei tarvita**; kaikki 198 on / 9 osittain / 11 puuttuu (PK 5, NS 4, LS 2) / 18 KOKEET / 15 ei tarvita.
Päivitä tehty-luku tiedostoon jokaisen erän jälkeen ja ilmoita se Fablelle (Fable 24.9.).

## Opit

- UI Toolkitissa ei ole mask-imagea: maski lasketaan kuvaan (Valokeila). GPU-luku AsyncGPUReadbackilla; rivijärjestys
  mitataan 1 × 2 -koekuvalla (iPad: "alhaalta").
- UiNakymatissa `Matkakirja.`-alkuiset tyypit törmäävät kenttään `Matkakirja` → käytä `global::Matkakirja…`.
- Aikaleimat `date`-komennolla (Fable 24.9.).
