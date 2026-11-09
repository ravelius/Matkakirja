# PT:n luovutus 9.11.2026 klo 09.25 (konteksti 31 %, pehmeä raja)

Korvaa -20261109-0152:n JUNA- ja AJOSSA-kohdat; aiempien luovutusten OPIT voimassa.
Viestit: SendMessage-raja täyttyy nopeasti → mcp__ccd_session_mgmt__send_message id:llä (osoitekirja). Junarivit juna.py, työlista tyolista.py.

## JUNA 223 AUKI (ei julkaisua ennen omistajan pyyntöä)
Kärki 4e972eeed (natiivi-backup julkaisija/juna-223), testit vihreät (unity 0, Kartta 729, Linssit 2276, Peli 877), ei laitekäännöstä:
2f2e13352 + iPad 70 % + Pariisin kartta + ★-kyltit + pallo iPhone + lehden taitto 1a+1b + kuvateksti vain avattuun 835f617a6
(omistaja 07.03 Kelpaa) + juoksupeli 1c kallistus + 1g sivuseinä (1f ja d2 peruttu revertein, omistaja 08.32)
+ nostovalikko osat 1–3 + osa 2 (omistaja 08.37 Kelpaa; ilman osaa 4).
Ennen TF:ää auki:
- PK suunta 84521ba9b (omistaja 08.32: ovesta vasemmalle kohti kameraa, eunukki näkyy, kaari taakse, 3-2-1; d2 kurkistus mukana,
  omistaja 08.30 Kelpaa). Mac-ajo pk-suunta-<koko>-84521ba9b JU:lla → PT katsoo → KK → omistaja → JU poimii.
- Leijuva kattotiilikaistale taivaalla (iPhone pysty, myös vaaka/iPad, jo 451519f87:ssä) → PK:n seuraaja tunnistaa (`ui juoksupeli mika x y`);
  mallivika → LAV, karsinta → PK.
- 1c kallistus omistajalle (KK lupasi ennen TF-korttia).
Raamattu 2.177 mainissa (PR 6506, 7bb11074d): lähtö ovesta vasemmalle kohti kameraa + sivuseinä.

## SEURAAVA (koe, ei junaan ilman korttia)
Paikkapalkki (omistaja 08.41 + kortit 08.4x: paluu itsestään sulkiessa, toisen kaupungin nosto lentää aina; KK:n suunnitelma
scratchpad/keskustelukanava/suunnitelmat/20261109-paikkapalkki-ja-noston-lento.md): NUI f9f93385f (osat 1–3 + osa 4 lentokartta),
Mac-ajo sk-paikkapalkki-1 JU:lla → PT. NS:n seuraaja: kaupunkien välinen lentokäyrä (luovutus 1ac98f0fe); PT:n päätös:
matkalento saa ylittää zoom-rajan, huippu pidetään, 600 km ≈ 4,5 s, 100 km ≈ 3 s; rajapinta NUI:lle (NUI ei pidennä omaa kestoa).
Pariisin nostot ohjelmakohteina: KS:n selvitys mainissa (PR 6507), KK näyttää omistajalle; ei rakentamista ennen.
FPV-drone: omistaja hylkäsi Codexin kuvat, tilasi uuden suoraan → KK katsoo.

## LEVY
14 Gi → 87 Gi (roolien siivous + PT poisti /private/tmp/claude-502:n yli 12 h hiljaiset sessiokansiot 25 Gi ja Unity 6000.7.0b7 15 Gi,
omistajan pyynnöstä). Yösiivous (proto-3d tyokalut/siivoa-levy.sh, kohta 6) poistaa nyt myös yli 12 h hiljaiset /private/tmp-sessiokansiot
(commit 47ca318e8 paikallisessa proto-masterissa). Huom: T7:n proto-mac-kopio on 7.0b7:llä.

## OPIT
- Katsoin d2-kuvat enkä huomannut taivaalla leijuvaa kattokaistaletta (KK huomasi): katso kuvista myös reunat ja taivas.
- Junaan poimittava haara rakentuu usein roolin haaran aiempien commitien päälle: tarkista ketju ennen KK-sanaa.
