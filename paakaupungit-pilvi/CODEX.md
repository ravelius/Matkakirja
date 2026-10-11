# Codex: pääkaupungit e04–e14 (Päätoimittaja 11.10.2026, omistajan tilaus)

Omistaja 11.10.2026 klo 17.5x: pääkaupunkien viimeistely koko maailmassa annetaan Codexille (Clauden pilvikrediitit
on käytetty; erät e01–e03 tehtiin pilvessä tällä samalla ohjeella ja ne ovat pelissä tai junassa).

## Tehtävä
Erät **e04–e14** (`erat.md`, 96 kaupunkia: Afrikka, Aasia, Amerikat, Oseania) täsmälleen
`PILVIOHJE-paakaupungit.md`:n mukaan (luvut 1–13 ja loppuun lisätty LISÄSÄÄNTÖ). Ohje on kirjoitettu pilvisessiolle;
sen sääntöjä sovelletaan sellaisinaan näillä muutoksilla:

1. **Ympäristö:** ajat Macilla, et pilvessä. Haara per erä `paakaupungit-<erä>-codex` haarasta
   `paakaupungit-codex-pohja` (= main + tämä kansio). Kirjoitat vain kansioon `paakaupungit-pilvi/<erä>/`.
   Ei PR:ää, ei mergeä, ei muutoksia pelin tiedostoihin eikä muiden haaroihin.
2. **Agentit:** omasi (Sol, Terra, Luna). Ohjeen luvun 8 kehotteet ovat mallit tehtävänjaolle.
3. **Lähteet ja kuvat:** robots.txt ensin (skriptattu haku vain sallitusta); Wikipedia, Wikidata, Wikivoyage ja
   Commons rajapintojen kautta. Kuvat vain Commons-osoitteina lisensseineen (PD/CC, ohjeen luku 5); ei generointia.
   Jos jotain on pakko tallentaa levylle, NAS `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/`,
   ei käynnistyslevylle.
4. **Järjestys:** e04 → e14. Herkät (`erat.md`) erän viimeisinä: Naypyidaw ja Pjongjang ilman nykypolitiikkaa,
   juntta- tai konfliktisisältöä (spec-asia). Suojattuja teoksia (tekijä kuollut alle 70 v) ei kuvina eikä kohteina.
5. **Valmis erä:** `node paakaupungit-pilvi/tyokalu.mjs tarkista <erä>` = 0 virhettä, RAPORTTI.md (luku 11) ja
   itsetarkistus luvun 13 pistokoesäännöillä (luvut kahdesta lähteestä) → push → yksi rivi postilaatikkoon
   `posti/codex-fable-paakaupungit.md` (uusin kärkeen: erä, haara, SHA, poikkeamat ja jätetyt kaupungit).
6. **Meidän puoli:** Sisältökirjuri pistokoe → Pelikoodari kytkee (`tools/paakaupungit/kytke-pilvisisalto.mjs`) →
   Julkaisija vie junassa. Korjauspyynnöt tulevat postilaatikkoon tiedostoon `posti/fable-codex-paakaupungit.md`.
7. **Kysymykset** postilaatikkoon; älä jää odottamaan vastausta, vaan jatka seuraavaan kaupunkiin.
