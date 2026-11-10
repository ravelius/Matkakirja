# Natiivi-UI: luovutus 10.11.2026 klo 22.25 (kontekstivahti 26 %; korvaa -2130:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS (Karttaseppä) local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
UUSI TYÖTAPA (omistaja 21.38, PT välitti, KOE): näkyvän työn (merkit, ilme, valikot) karkea kuva/video SUORAAN KK:lle, PT kopiona; junaan vasta KK:n katsottua.

## VALMIIT TÄNÄÄN (älä toista)
- -2130:n valmiit (tavoitepalkki, tapit, kontrasti, jättinimet) ennallaan.
- Worktree-siivous 21.4x: 28 pois (natiivi + fable). Jäljellä proto-nui-nimizoom (tarinamerkki-koe) ja proto-nui-paisuu (paisunta).
- PAISUNTA, Notre-Dame karkea video KK:lle 22.25 (kopio PT): ks. AUKI 1.

## AUKI
1. PAISUNTA (omistaja 22.01 KK:n kautta "voisiko rakennusta vain paisuttaa hetkellisesti joka suuntaan jos se on kohteena?";
   KK:n tavoitekuva Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-nahtavyys-paisuu-kohteena.md; KOE, EI JUNAAN):
   - Koodi natiivi-backup natiivi-ui/nahtavyys-paisuu, worktree /Users/Shared/Claude/wt/proto-nui-paisuu: juna 224 8e5e1f3e7 + KS:n 1:1-ND 098f9f05c
     + a4440e04c, dbe71aab8, 7d4e5b2b6, ff2b1c5c2 (kärki).
   - UI/Paisunta.cs (Update: animaatio, kerroin = 160 m / max(korkeus, säde) rajattuna 1,2–3 piirtyvän mallin verkosta; kasvu 0,5 s ylityksellä
     LiikeKayra(0.3,1.35,0.5,1), paluu 0,35 s; valinta päättyy kun Pinnaus.Nykyinen == null). NahtavyysEsittely.Esittele kutsuu Paisunta.Aloita.
     Komento `ui paisunta 0|1|tila|tavoite|min|katto|kasvu|paluu|aloita <k|0> <nimi>|lopeta|rajaus 0|1|piilo <k> [reuna]`.
   - KS:n rajapinta (KS 22.1x/22.5x hyväksyi; katsoo ennen junaa): Kartta/PaisuntaTila.cs (kerroin nimellä + Piilo → globaalit _nahtavyysPiilo,
     _nahtavyysPiiloReuna), OhjelmaKohteet `koko *= PaisuntaTila.Kerroin(k.Nimi)`, Nahtavyysalue Tripo-skaala × kerroin (1 rivi),
     TaloKerros.shader (o.korkeus × smoothstep), Linssit/Resources/Varjostimet/KaupunkiPuu.shader (hav × smoothstep, puut).
   - Ajot: paisunta-1/-2 = osia 0 (vanha haku, älä käytä). paisunta-3 7d4e5b2b6 ✓ (ND 96 m → 1,67, osia 3): videot + pari
     /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/paisunta/ → KK:lle 22.25. ff2b1c5c2 (+ puut) JU ajossa → lokit/nui-paisunta-3-ff2b1c5c2: tarkista
     Shader-error 0 (KaupunkiPuu-muutos), ei tarvitse uutta lähetystä ellei poikkea.
   - Tunnetut puutteet: b-videossa paluu ei näy (`ui sulje` ei sulje palkkia: etsi palkin sulkukomento tai lisää `ui paisunta lopeta` skenaarioon);
     esittelyn kamera ~1,85 km, koska ND:n Tripo-rajat (kyltti/rajaus) ovat ~620 m korkeat (KS:lle kerrottu; Paisunta.Rajaus oletus pois);
     piilo on ympyrä (pidemmän sivun puolikas × kerroin), pitkänomaisella voi litistää sivuilta liikaa.
   - SEURAAVAKSI KK:n palautteen mukaan: Riemukaari ja Eiffel samalla skenaariolla (sk-paisunta-3.txt pohjana: aja RK 48.8738 2.2950,
     Eiffel 48.8583 2.2945; napauta Riemukaari / Eiffel-torni) → video KK:lle, kopio PT.
2. HUOMENNA: iso iPad 0f0f950a6 (KS:n yhdistelmä; JU ajaa): grep "esteet ohitettu|estevirheitä|nähtävyyslataus|Exception", nimet + ND + kirja/Liiku-rajaus → PT (+ KS loki).
3. TARINAMERKIT: odottaa Codexin toimitusta (_review-tarinamerkit-20261110/ origin/claude/postilaatikko; 22.0x ei vielä). Ohje kuten -2130 AUKI 2;
   kierros 2 nyt KK:lle (kopio PT), uusi työtapa.

## JONO
1 (KK:n palaute → RK + Eiffel), 2 (huomenna), 3 (Codexin jälkeen).
