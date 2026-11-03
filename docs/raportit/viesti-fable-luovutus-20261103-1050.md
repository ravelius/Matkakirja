# PT:n luovutus 3.11.2026 klo 10.50

Edellinen: viesti-fable-luovutus-20261103-0837.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Syy: konteksti 30 %.
Vahdit Monitorilla 30 min: /Users/Shared/Claude/hooks/codex-posti-vahti.sh ja odottajat-vahti.py (viritä uudelleen).
`date` ennen aikaleimoja. Työlista päivitetty 10.49 asti (tools/asemataulu/tyolista.py).

## OMISTAJAN PÄÄTÖKSET JA PYYNNÖT (KK:n kautta)
- 08.48 saapumisen kuvat: ~1 s tauko zoomin jälkeen; kuvat nousevat kaupungin eri kohdista, vaihto samaan aikaan; isoisän kuva
  matkakirjasta (vasen ylä) ja takaisin. 09.28: kuvat jäävät kartalle pieninä omille paikoilleen, myös nostojen kuvat (ensin vain
  Pariisi + Lontoo, todella pieniä). Ei videoita omistajalle: katsoo iPadilta. Suunnitelma
  scratchpad/keskustelukanava/suunnitelmat/20261103-saapumisen-kuvat.md (A liike NUI, B paikat KS, C pienet kuvat NUI, D NS, E JU).
  Aloitusintro pysyy ennallaan (PT + KK 10.12); KK kysyy omistajalta vasta kun tämä on nähnyt nousun.
- 10.10 pieni iPad: 8d18d7047 asennettu 10.11; omistaja 10.22 Lontoo "Hyvä".
- 10.38: Big Ben vain lähizoomilla (KS); kuumailmapallot paikallaan + pois kohteen valinnan ja matkan ajaksi; reitit näkyvissä koko
  liikkumistilan ajan, myös nopanheiton jälkeen (NUI). PIENEEN IPADIIN YKSI ASENNUS vasta kun nämä + nousu + pienet kuvat + nostojen
  kuvat Pariisi/Lontoo valmiit; KK katsoo ensin. Työlistarivi "Big Ben, kuumailmapallot ja reitit liikkuessa".
- Omistaja siirsi Codexin 3D-tilaukset Tripo-sessiolle (postilaatikko 3fef939cc/d5ca3caf2): arkiset hahmot (PK) ja pronssien
  jatkot (LAV) nyt Tripolta. PK ja LAV tietävät.

## SAAPUMINEN (juna 218)
- Runko natiiviseppa/juna-218 8d18d7047 (esilataus + NUI-ilmaisin + nosto + loppubeige) KUITATTU, iPadeissa.
- Kaksi vikaa jäljellä (NS, nollattu 55471e39c): LÄHTÖ Pariisista ~1 s tyhjä beige (syy piirroksen striimitauko c4867180f);
  TULO Lontoo sumea ~7,25–8,25 s. NS:n 9613f5ad7 "tulo korjattu" EI pidä (PT luki kylmän ruudukon: terävä vasta ~8,5 s) → EI junaan;
  junaan vasta kun lähtö + tulo näkyvät ruudukossa. Sitten fps-mittaus isolla iPadilla (vapaa); iPhone lukittu ("Ei nyt").
- maxRenderTextureSize(8192)-lokirivi = NS:n varjokamera, ei piirrä, ei korjausta.

## SAAPUMISEN KUVAT (NUI, nollattu 3e15a6a38)
- Koe af7bea5d8 KS:n paikoilla (PR 6116) simussa. KK 10.48 EI VIELÄ IPADIIN: Pyhän Paavalin suunta väärä, isoisän kuva ei nouse,
  Pariisiin saavuttaessa vanha sumennettu esittely (nousu kaikkiin saapumisiin, intro vain alussa), Notre-Damen tyhjä pikkukuva,
  Westminsterin pikkukuva peittää kyltin. Lähetetty NUI:lle 10.49 (havainnot lokit/kk-nousu-af7bea5d8-20261103/havainnot.md).
  Sitten pallot + reitit → JU pieneen iPadiin → KK katsoo.
- KS osa B: muut 58 kaupunkia haussa (Overpass) → PR.

## JUOKSUPELI
- PK: 218z VOITTAJA (piilossa 466→145), taso1b 0/7/0/12 ehto täyttyi → pelikoodari/juna-218-z eb2b057bc (+ LAV friisi osasarja-v8
  = sama paketti uudella nimellä, tausta-v115), JU:lle junaan. 218-aa (ty Tiyuandianin räystäsnosto) JU:n jonossa → taulukko.
- VS (nollattu 1cf05aede): valo 218y+juna-218 kuitattu. Kontaktivarjo k1 hahmolle hento, kalusteet eivät (yhdistetty verkko);
  k2 32bac65ec (laatikot glb-solmuista + voimakkaampi) JU:n jonossa → pari PT:lle.
- LAV (nollattu 71982584e): rivi 52 kohta 1 viety (v8/v115), PK kytkee, editoripari; kohta 3 alussa.
- Umbra OletusLog 0 kuitattu; junassa jo lineaarinen → ei siirrettävää.

## PARIISI (KS)
- Kaikki 15 palaa hyväksytty (viimeiset 12, 08 v2, 13 v2, 04, 14, 09 v7 kaistatavalla). Ei palaa 16: kulma läpinäkyväksi (tehty).
- Koonti v2 (pariisi-yleis-v2.jpg): raidat pois, sävyt osin. EI VIELÄ TASOIHIN: länsisarakkeen punerrus + keskisarakkeen raja
  x≈2612 → palakohtainen värinsiirto; tavoite: yleiskuvassa ei palarajoja. Sitten tasot + Big Ben. KS nollautumassa.
- Tasankopoltto käynnissä (~13 UTC) → delta → välitaso → JU.

## NOLLAUKSET
Postivahti nollasi KS, NS (2 kertaa), NUI (2), JU, VS, PK, LAV. Postivahti tekee oman luovutuksensa, kun jono tyhjä.
