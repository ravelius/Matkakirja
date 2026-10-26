# Päätoimittajan luovutus 15.10.2026 klo 18.3x (oma nollaus, konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikalliset muutokset scratchpad/asemataulu/data/talo/{junat,tyolista}.json (Postivahti vie). PT:n worktree /Users/Shared/Claude/wt/fable-iss-yotaivas (PR #4637: Raamattu + loki 17.51, 18.10, 18.28, 18.31 + tämä luovutus) → Julkaisija mergeää kun CI vihreä; sen jälkeen `tools/uusi-worktree.sh --poista`.

## 0. Heti aluksi
Aloitusviestin mukaan: RC päälle, odottajavahti-Monitor, get_usage self.

## 1. Omistajan päätökset tällä vuorolla (kaikki lokissa, PR #4637)
- 17.51 El Dorado -unikuva hyväksytty → Codex tekee #281–283 (naamio, jadesinetti, Kolme veljestä) samalla tyylillä, natiivikoko (~1254), toimittaa kolme yhdessä vertailuarkin kanssa (posti bacc7f7f6). Kun tulevat: kuittaa ja välitä Natiivi-UI:lle.
- 18.10 ISS-vaihe 2 + aloituskartan vihjeet + Atacama odottaviin (toimeksianto scratchpad/keskustelukanava/iss-yotaivas-20261015.md). Raamattuun VAIN EUROOPPA -poikkeus aloituskartan vihjeille.
- 18.28 ISS-sijaintikartta: "kaikki kuvaruuduiksi" → NUI tekee kaikki ryhmät kuvaruuduiksi, mustat kulmat pois, SIJAINTI-näytön valkoinen laatikko (bugi?) ja "Nyt"-valinnan nimi (vuodenaika) → kytkentä Ryhmat=true junaan 195 korjausten jälkeen.
- 18.31 vihjeet: "vasta kun selkeä suunnitelma mitä niissä tapahtuu" → odottaa; ISS-raketti karttapaletilla "Kyllä sekä muillekin samanlaisille kohteille" → KS kytkee raketin junaan 195 ja inventoi muut kirkkaat karttakohteet; Raamattu KARTAN KOHTEET KARTTAPALETILLA.
- 18.32 BUGI: ISS-paneelin LAAJA/TELE eivät tee mitään → PK etusijalla junaan 195. Kuvauskokemuksen kehitysideat KK esittää omistajalle, toteutus erillisellä päätöksellä.
- PT:n linjat tällä vuorolla: EI iPad-/simutodistusajoja junaan (omistaja 09.36 "Ei testejä junaan"; myös Unity b5 muistiajo OHITETTU). Simuvuoro sallittu vain omistajalle näytettäviin kuvapareihin. EI OpenAI API -polkua Codexille (osto). Unikuvien natiivikoko hyväksytty.

## 2. Juna 195 (kertyy, lukitus/TF vain "OMISTAJA PYYSI JULKAISUA")
Runko 3643b4a7f (NS, Unity b5, testit vihreät). Kuitattu runkoon tällä vuorolla: PK e36f3b880 (lentokone), NUI 1c94d9746 (TF194-palaute 1–5), Valoseppä b49666bc7 (savu + valas v10), LS1 93c146524 (Ateenan kulku), PK edb351a43 (Ateena v12 Zeus + puut; LS1:n 08ac5caee EI), PK ef62db63e (ISS-korjaukset), KS 9ec2636f5 (Ateenan vesi 20 km), NUI a5e0d1373 (sijaintikartta kytkimen takana), PK ccf98514e + 79fe06d98 (Mikä tämä on?), LS1 6f27c5ad6 (testin kiinteä kello).
Työn alla: PK LAAJA/TELE; NUI sijaintikartan kuvaruudut; KS raketti + karttapaletti; LS1 Hefaistos→Akropolis-lentosääntö (KaantoPidennys, ≤ 35 s); SK Lontoon historiatekstit.
Ennen lukitusta: JU vie Ateena v11/v12-datan, KS maa v3 + vesi index-v25, pallo-lohkoton-massavienti (valmis ~19.40, pid 3284) → KS-seuraaja siirtää T7:lle ja ruudukko bfe2b2300 runkoon. Web-PR:t odottavat julkaisupyyntöä: #4629 (apurahan maapallo), #4636 (historiakuvien polut).

## 3. Juna 196 / pidemmät
- ISS-yötaivas: LS1 linssiseppa/yotaivas-196 f8356c576 (vaihe 1 kytkimen takana), seuraavaksi TaivasKohteet; kuvapari omistajalle ennen kytkentää; Pulun kesäyön lause Tekstit-osastoon.
- Revontulet: Valoseppä (tavoiteluuppi NASA PD).
- Taivaskohteiden tekstit: SK (tai seuraaja).
- Peking-testi 2c72c4935 (Valoseppä) odottaa Codexin mallipolkua (664b6ee80) → välitä Valosepälle.
- Isoisän uni: NUI rakentaa kytkimen takana; odottaa tekstin hyväksyntää (isoisan-uni-alkusoitto) + 3 kuvaa.
- Louvre: LR odottaa Codexin K1:tä (posti 98c3dcfe4).
- Codex Peking48: PT vastasi 998b1fe5a (kattosävy, korkeusristiriidat ratkaistu nykyisillä arvoilla).

## 4. Muut
- Nollattu tällä vuorolla: Julkaisija, Valoseppä, Natiivi-UI, Linssiseppä, Karttaseppä, Pelikoodari. SK (26 %) luovuttaa erän jälkeen; avoimena sille pulu-mika-en-tunne Tekstit-osastoon + taivastekstit.
- PK:n äänilista (ISS-tekstit ilman ääntä) LAAJA/TELE-korjauksen jälkeen.
- Levy 64–65 Gi vakaa; orpo recordVideo pysäytetty.
- Äänittäjä levossa (kertojan v1-aika-v2 tehty).
