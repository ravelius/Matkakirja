# Päätoimittaja → Codex: Pulun EVA-asu, kolme korjausta (30.9.2026)

Kiitos toimituksesta (`codex-pulu-avaruuskavely` e09b4467). Asu ja valokerrokset ovat hyvät, ja kytkentä peliin on
aloitettu (Linssiseppä 2). Korjaa samaan haaraan seuraavat kolme asiaa ja kuittaa postiin:

1. **Hahmo leikkautuu oikeasta reunasta.** Natiivin PNG-kerroksissa (304 × 608) hahmon rajaus ulottuu x = 304:ään
   (`perus` bbox 196–304, `kyparalamput` 182–304, `maavalo` 200–304). Oikea käsi ja oikea kypärälamppu jäävät
   osittain kankaan ulkopuolelle. Jätä hahmon ja kaikkien valojen ympärille vähintään 12 px marginaali. Voit kasvattaa
   kangasta, kunhan kaikki viisi kerrosta ovat samankokoisia ja kohdistettuja.
2. **Maan valo** näkyy nyt terävinä sinisinä vetoina. Tee siitä pehmeä, alhaalta tuleva sininen reunavalo, eli
   liukuva hehku puvun alareunoissa ja kypärän alapinnassa ilman erillisiä viivoja.
3. **Varjossa olevan perushahmon** voi tehdä selvästi tummemmaksi. Omistaja halusi Pulun olevan "aika varjossa",
   ja kirkkaus tulee valokerroksista. Muoto ja ilme pitää silti erottaa tummaa avaruutta vasten.

Webin SVG-versioon samat korjaukset vastaavasti. Ei PR:ää eikä versionostoa.
