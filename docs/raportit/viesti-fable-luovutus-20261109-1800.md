# PT:n luovutus 9.11.2026 klo 18.00 (PT local_8d8ebf72; konteksti 30 %)

Korvaa -1640:n JUNA-, AJOSSA- ja LOKI-kohdat; -1400:n LINJAT ja -1005:n TILINVAIHTO/OPIT voimassa.
ENSIN: set_remote_control self true. Vahdit (30 min, uusi joka vanhenemisella): Monitor `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py`,
`sh /Users/Shared/Claude/hooks/codex-posti-vahti.sh` ja postilaatikko (git ls-remote origin claude/postilaatikko minuutin välein).
Omistaja POISSA studiolta (17.02): ei iPad-avauksia, Mac vapaa.

## JUNAT
- 223 = 85d3bab39 LUKITTU, TF 224 valmis 17.33 (sisäinen ryhmä), taulussa tf. Asennuslinkki toimii (MK kehitys, fi.matkakirja.peli.kehitys;
  palvelin pid 87396 127.0.0.1:8743, kansio /Users/Shared/Claude/proto-3d/jako vain .ipa+manifest+index; uudelleenkäynnistysrivi JU:n luovutuksessa).
- 224 AUKI = db1dbdc9f (85d3bab39 + PK liiketappi 678376fbb + Pulu v3 4c49da614; mukana NUI 755a52fab/606e08631/9fd044500/a73c5c202, PT hyväksyi).
  PT kuittasi junaan lisäksi: PK Lontoo-Pulu v4 08f48ac73. Pelitila (Info.plist) + lisämuisti kehitysversioon (OMISTAJA 17.31) JU:lla.
  ODOTTAA PT:n kuvia ennen junaa:
  - NUI 75e5b3f22 (kadonnut-tahti: tähti kuvamerkin ylle; KK hylkäsi d2596ef17:n, koska Temple-tähti kuvamerkin takana) + ketju kuvaotsikko 0e4db4471
    (Temple-piste 075015709, ✕-piste 8ef2b3561, aarrekulma 066244413, pyöreän kuvan otsikko 22e9e92e8). Temple-arkki → PT → KK.
  - KS-ketju d5aea75b7 → fd079ee0e (nimi → Kohdenostot.Kohde, 7 aliasta, Lontoon QID:t, mallin napautus avaa esittelyn, Grand Palais ✦ dbe105f0f,
    näkyvyysväistö). Mallinostot-6: Sainte-Chapelle yhä ND:n takana? Jos on, KS antaa kiinteän aloitussuunnan (PT:n ohje), ei 4. väistöversiota.
    Temple-kierron ND-etuala korjautuu tällä. Yhtenä junaan.
  - PK nimiäänet eb4318b15 (bda9945bf + KS-ketju): v3-ajo JU:lla (Saint-Merri, Porte Saint-Denis, ✦ Les Halles). v1/v2 eivät todistaneet (skenaario).
    Äänipaketit luennat v8 + pariisi-nimet v1 viety (kieli.json korjattu).
- Sisältövienti v1031 (KS Lontoon 14 kylttiä d8dcdc43a) tehty, PK tarkisti (28/28 Commons; ORNC en-wiki-vara, ei vikaa).
- JU:n esikatselu pakottaa täyden kerroksen ennen 1. kuvaa (17.58) → mustat/harmaat väärät hälytykset loppuvat.

## KOKEET (ei junaan)
- VS FPV-vuoret maalattuina (OMISTAJA 17.25 Kyllä): it. 10 8f14c3463 (uurteet pois väristä) JU:lla → pari PT:lle → arkki KK:lle. Tavoite: pintakuvio
  lähelle (ei muovia; omistajan 16.39 "kumpareet, uurteet, kivikko"), kauko-oranssi ilman rajaa. Pohja NS a1515df04 (lähivaihtelu 400 m, jää).
- NS: huippunimet d3a989913 (vapaa = vain elava-huippu; karsinta UI-nappien alta/harjanteen takaa) JU:n ajossa → pari PT:lle → KK. NS lepää.

## MUUT
- Pariisin 94 nimeä JÄISSÄ (16.49). Muiden kaupunkien 3D-mallinnus auki (16.50). Pöllö-worker korjattu (PR 6520).
- LAV lepo (ovet odottavat PK:n ovipaikkoja). PK nollautuu usein (~25 min) – kehotettu säästämään kontekstia.

## LOKI (kirjaa seuraavassa loki-PR:ssä; scratchpad/pt-loki-odottaa.txt sisältää rivit 14.34–17.31)
16.46 Lontoon 14 kylttiä tekstein + Pulu + Commons; 16.49 Pariisin 94 nimeä jäihin, kaikista kaupungeista Pariisin kaltaisia; 16.50 paitsi 3D-mallinnus;
17.01 nimiotto + 26 alkua, kysymykset kortteina; 17.02 juna 223 TF:ään; 17.03 asennuslinkki kokeena; 17.12 otot kelpaavat → 224;
17.25 FPV-maalaus jatkuu; 17.31 pelitila + lisämuisti kehitysversioon.
