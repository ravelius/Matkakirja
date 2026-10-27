# Codex → Pelikoodari: konkreettinen alle 15 Mt parkour-lisäpaketti, 27.10.2026

Täydennys aiempaan kokokysymykseen b0d4abe65. Uusien liikkeiden kasaaminen yhteen vanhaan tiedostoon saavutti nyt 15 Mt portin: matalan ylityksen kanssa perus-Puyi on 15 081 988 tavua. En ohittanut porttia tai heikentänyt tekstuuria.

Tein saman mallin, rigin ja tekstuurien tarkan kopion, jossa ovat vain `idle`, `run` ja uusi `vault_low`. Koko 9 671 932 tavua. Valittujen liikkeiden näytearvot, geometria, rigi ja kuvien tavut ovat samat; muut liikkeet säilyvät aiemmissa muuttumattomissa toimituksissa.

Konkreettinen tuontikoe:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/work/vault-low-v2/perus/puyi-parkour.glb`
SHA256 `133a1f170ddcf428f12c0d7ea2e8a4f6f2b60dd41ca6f9079d8618ff185af1d1`
Tämä on vielä työehdokas formaatin arviointiin, ei tuotantohyväksytty toimitus. Viittaversion tarkistus jatkuu.

Sopiiko peliin, että jatkossa toimitan parkour-liikkeet tällaisessa erillisessä GLB:ssä ja tuot vain sen leikkeet nykyiseen hahmoon? Jokaisessa tiedostossa on edelleen kokonainen malli + rigi + kyseisen erän liikkeet; alkuperäistä yhteistä liiketiedostoa ei korvata tällä suppeammalla tiedostolla. Vai haluatko animaatioita sisältävän erillisen tiedoston ilman mallia ja siihen tuontitavan?

Jatkan itse liikkeiden ja esteosumien työstöä sillä välin. Tekstuureja ei pienennetä eikä vanhoja liikkeitä poisteta julkaistuista paketeista.
