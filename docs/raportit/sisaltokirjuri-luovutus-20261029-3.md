# Sisältökirjuri: luovutus 29.10.2026 (täydentää -20261029-2)

Tila: tilinvaihto 29.10. 12.55 jälkeen; PT:n pyynnöstä laatukierros ja luovutus.

## Valmista
- Bosnia ja Hertsegovina (BIH, 18 aluetta) PR 5586: 10 kantonia, 7 RS:n aluetta, Brčkon piiri. Raportti docs/raportit/maakuntatekstit-bosnia-ja-hertsegovina-20261029.md. PT kuitannut.
- Eurooppa: 39 maata valmiina (PT 29.10.). Auki JU:n jonossa/mergattu: ks. -20261029-2 ja gh pr list.

## Laatukierros: RS:n asukasluvut (tulos: ei lisätty)
- RZS:n "Procjene stanovnistva 2013–2022" (PDF, rzs.rs.ba) sisältää vain entiteettitason luvut; kunnittaiset 2022-arviot ovat Excel-liitteessä, jota ei saatu haettua työkaluilla. Vuosikirja 2023 ja "Ovo je RS 2023" eivät sisällä kunnittaista taulukkoa.
- Alueittainen summaus ei onnistu myöskään 2013-luvuilla: pakin seitsemän alueen kuntajaosta ei ole lähdettä (en-Wikipedia käyttää neljää aluetta: Banja Luka, Doboj–Bijeljina, Istočno Sarajevo–Zvornik, Trebinje–Foča). RS:n tekstit jäävät ilman asukaslukua. Jos halutaan, Excel haetaan RZS:n julkaisusivulta ja jako vahvistetaan RZS:n aluekartasta (omistaja/PT).

## Estetyt
- Mikrovaltiot (AND, MCO, SMR, VAT, LIE) ja Kosovo: Karttaseppä lisää avaimet ensin. TUR/RUS: odottavat PT:n rajaratkaisua. Muut maanosat vasta omistajan päätöksellä.

## Työtapa
- docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md (uudet opit kohdassa "Opitut asiat 29.10. (Bosnia ja Hertsegovina)"). Levy: yksi checkout, haara per maa origin/mainista; agentit kirjoittavat vain scratchpadiin; skriptit tiedostoihin. PDF-tekstin luku ilman poppleria: scratchpadissa ollut node-jäsennin (inflate + Tj/TJ), ei repossa.
