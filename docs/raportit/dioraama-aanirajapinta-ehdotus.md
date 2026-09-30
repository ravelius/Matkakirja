# Dioraaman äänirajapinta-ehdotus (Linnanrakentaja erä 2, 29.9.2026)

Minimaalinen lisäys ILinssiYmparistoon (LinssiSopimus.cs), Pelikoodarin linja A:

```csharp
/// <summary>Nimetty äänisilmukka: oma AudioSource, ei jaa Aanisoittimen 5 kiinteää kanavaa.</summary>
public interface ISilmukka
{
    /// <summary>Taso 0…1, liu'utus liukuS sekunnissa (0=heti); kutsutaan joka ruutu kameran mukaan.</summary>
    void Voimakkuus(float taso, float liukuS);
    /// <summary>Häivytys nollaan ja vapautus; turvallinen kutsua useaan kertaan.</summary>
    void Lopeta(float haiveS = 0.35f);
}
/// <summary>Taustasilmukka URL:sta (dioraama: tunnus = AmpariJuuri + Aanet[id].Tiedosto); monta voi olla
/// auki yhtä aikaa (toisin kuin Taustaaani). Puuttuva ääni: kahva palautuu, ei soi, loki kerran.</summary>
ISilmukka Silmukka(string tunnus);
```

**Repliikit (kertaluonteiset) eivät tarvitse rajapintalisäystä:** DioraamaSovitin soittaa ne suoraan
(EsityksenAani-malli: UnityWebRequestMultimedia, compressed=true, ei levyvälimuistia, kesto Aanet[id].KestoS:stä),
koska sovitin lataa glb/atlaksetkin suoraan. Duckaus on sovittimen vastuulla: Voimakkuus(pienempi,~0.15)
omistamilleen kahvoille rivin ajaksi, palautus lopuksi; ei automaattista väistöä (AaniTilan puhe-väistö
koskee vain 5 kiinteää kanavaa).
**Tunnus = valmis URL**, ei uusi globaali taulukko (vrt. LinssiTaustat): sovitin laskee sen itse. Aanisoitin
toteuttaa Silmukka():n uudella poolilla samalla lataus/välimuistiputkella (Mukana.Polku, LevyPolku, Hae/Pura,
striimi >3 Mt) kuin nykyiset kanavat, mutta ilman A/B-ristihäivytystä. Virhe: Debug.LogWarning "MATKAKIRJA
ääni: …" kuten nykyisin, ei kaadu. Sulkiessa DioraamaSovitin kutsuu Lopeta():n joka avoimelle kahvalle.
**Muuttuvat tiedostot:** LinssiSopimus.cs (ISilmukka+metodi); LinssiOhjain.cs (SilmukkaKasittelija-delegaatti,
kuten TehosteKasittelija); Aanisoitin.cs (uusi pooli + LinssiSilmukka(tunnus)); PeliOhjain.Aanet.cs
(kytkentärivi); IhmisenMatka2Ymparisto.cs (läpivientirivi); DioraamaSovitin.cs (käyttö: Tila.Aanet→Silmukka,
Paivita→Voimakkuus nakyma.Tasot-perusteella, Sulje→Lopeta).
**Testattavuus:** ILinssiYmparisto-toteuttajat tänään: LinssiOhjain (oikea), IhmisenMatka2Ymparisto
(läpivientikääre), ValeYmparisto (Linssit-testit/Testit/ValeYmparisto.cs). Kaikki 3 päivitettävä:
ValeYmparisto tarvitsee uuden ValeSilmukka:ISilmukka-lokiluokan ja Silmukka(tunnus)-toteutuksen, joka
luo ja palauttaa sen.

**Kolme kysymystä Natiivisepälle:**
1. Tunnus=valmis URL hyväksyttävä poikkeama Taustaaanin id-taulukosta, vai pitääkö rajapinnan resoloida se?
2. Uusi pooli ilman kanavakattoa: montako samanaikaista silmukkaa sallitaan, väistyykö Pohja/Musiikki dioraaman ollessa auki?
3. Repliikkien duckaus jää sovittimelle — pitäisikö sen näkyä AaniTilan globaalissa väistössä (puhujia-laskuri)?
