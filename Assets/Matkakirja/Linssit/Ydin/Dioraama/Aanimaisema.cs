// DIORAAMAN ÄÄNIMAISEMA — puhdas logiikka (Linnanrakentaja erä 2, 29.9.2026; speksit dioraama-rajapinnat-
// era2-20260929.md kohta 2 "AANET" ja dioraama-aanirajapinta-ehdotus.md). Laskee kahden tyyppisen
// äänilähteen tavoitetason näkymästä: tilan omat silmukat (Tila.Aanet) ja tilan satunnaiset kertaääni-
// tehosteet (Tila.Tehosteet). Unity-puoli (Linssit/Unity/DioraamaAanet.cs) toteuttaa tämän: hakee/luo
// ISilmukka-kahvat, kutsuu Voimakkuus(tavoite · omat kertoimet, ~0,4 s) joka kehys ja soittaa
// tehosteajastimen antaman äänen kerran.
//
// TILAN SILMUKAT: Heratys.AanenVoimakkuus samalla 1,2 s liu'ulla kuin hahmojen herääminen (Heratys.
// HahmonTila), jotta ääni ja näkymä heräävät samassa tahdissa. Heratys.AanenVoimakkuus tarvitsee tason
// lisäksi sen alkamishetken ja edellisen tason (aikataulun historiaa), joita Nakyma.Tasot ei tuo ulos
// (PoikkileikkausLinssin sisäinen tapahtuma-aikataulu ei ole julkinen) — siksi tämä luokka seuraa itse,
// milloin annettu taso vaihtuu, ja käyttää sitä hetkeä "alkoi"-arvona. Koska Paivita-kutsuja tulee joka
// kehys, viive todelliseen vaihtumishetkeen on korkeintaan yhden kehyksen, käytännössä olematon.
//
// MASSA (koko linnan yleisnäkymämalli, dioraama-rajapinnat-20260929.md rivi 77: tila { id: 'massa',
// kohdistettava: false }): Heratys.Tavoitetaso antaisi sille lähes aina 0 (ei koskaan kohdistettava eikä
// kenenkään naapuri) — sopii geometrian LOD-tasoon muttei äänisuunnitteluun, koska linnan yleisääni
// halutaan kuuluviin nimenomaan YLEISNÄKYMÄSSÄ. Siksi "massa"-tunnuksen tilan silmukoilla on oma sääntönsä
// (Linnanrakentaja erä 2 -tilaus): 1 yleisnäkymässä, 0,35 kun mikä tahansa tila on kohdistettuna. Ei omaa
// liukua — Unity-puolen ~0,4 s Voimakkuus-liuku riittää pehmentämään vaihdon.
//
// TEHOSTEAJASTIN: siemenellä toistettava (Matkakirja.Linssit.Elava.ErikoisLiike.ArkkiSiemen-malli, FNV-1a
// merkkijonosta; samaa kaavaa ei voi kutsua suoraan tästä asmdefistä, joten pieni toisto on tässä), jotta
// sama tila+jakso antaa saman tehostejärjestyksen joka ajolla (testattavuus, QA-toisto). "Soi vain kun
// tilan taso ≥ 1" on KUTSUJAN vastuulla: TehosteenLaukaisu ei tee tätä tarkistusta itse, koska ajastimen
// ei pidä edes edetä tilan ollessa poissa näkyvistä (ks. metodin kommentti).
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Linssit.Dioraama
{
    public sealed class Aanimaisema
    {
        /// <summary>Koko linnan yleisnäkymämallin tila-id (dioraama-rajapinnat-20260929.md rivi 77).</summary>
        public const string MassaTilaId = "massa";

        readonly Dictionary<string, (int taso, double alkoi, int edellinen)> tilanHistoria =
            new Dictionary<string, (int, double, int)>(StringComparer.Ordinal);
        readonly Dictionary<string, TehosteAjastin> ajastimet = new Dictionary<string, TehosteAjastin>(StringComparer.Ordinal);

        /// <summary>
        /// Tilan (tai "massa"-yleisnäkymämallin) silmukoiden tavoitetaso 0…1 hetkellä t. tilaId: Rakennus.Tilat[].Id;
        /// nykyinenTaso: nakyma.Tasot[tilaId] (0/1/2, Heratys.TilanTaso) — sivuutetaan "massa"-tunnukselle;
        /// kohdeTila: nakyma.KohdeTila (null = yleisnäkymä).
        /// </summary>
        public double SilmukanTavoitetaso(string tilaId, int nykyinenTaso, string kohdeTila, double t)
        {
            if (tilaId == MassaTilaId) return kohdeTila == null ? 1.0 : 0.35;
            if (!tilanHistoria.TryGetValue(tilaId, out var h)) h = (nykyinenTaso, t, nykyinenTaso);
            else if (h.taso != nykyinenTaso) h = (nykyinenTaso, t, h.taso);
            tilanHistoria[tilaId] = h;
            return Heratys.AanenVoimakkuus(h.taso, h.alkoi, h.edellinen, t);
        }

        /// <summary>
        /// Tilan jaksoIndeksi:nnen TehosteJakson ajastin: palauttaa juuri NYT laukaistun äänen id:n, tai null jos
        /// väli ei ole vielä umpeutunut. Kutsujan vastuulla on kutsua tätä VAIN kun tilan taso ≥ 1 (muuten ajastin
        /// ei etene eikä kulu turhaan huoneen ollessa poissa näkyvistä — sama ajastin jatkaa siitä mihin jäi, kun
        /// tilaa taas kutsutaan). Siemen johdetaan tilaId:stä ja jaksoIndeksistä: sama pari antaa aina saman
        /// sekvenssin (myös eri Aanimaisema-instansseissa), koska ArkkiSiemen on puhdas funktio merkkijonosta.
        /// </summary>
        public string TehosteenLaukaisu(string tilaId, int jaksoIndeksi, TehosteJakso jakso, double t)
        {
            if (jakso == null || jakso.AaniIdt == null || jakso.AaniIdt.Count == 0) return null;
            string avain = tilaId + "|" + jaksoIndeksi.ToString(CultureInfo.InvariantCulture);
            if (!ajastimet.TryGetValue(avain, out var a)) ajastimet[avain] = a = new TehosteAjastin(jakso, ArkkiSiemen(avain));
            return a.Paivita(t);
        }

        /// <summary>Vakaa siemen tunnuksesta (FNV-1a; sama kaava kuin Matkakirja.Linssit.Elava.ErikoisLiike.
        /// ArkkiSiemen, jota ei voi kutsua suoraan tästä asmdefistä — pieni toisto on parempi kuin ristiinviittaus
        /// moduulien välillä).</summary>
        public static int ArkkiSiemen(string id)
        {
            unchecked
            {
                uint h = 2166136261;
                foreach (char c in id ?? "") { h ^= c; h *= 16777619; }
                return (int)(h & 0x7fffffff);
            }
        }

        /// <summary>Yhden TehosteJakson satunnaisajastin: soittaa AaniIdt-listalta yhden äänen kerrallaan, odottaen
        /// seuraavaa satunnaisin väliajoin ValiMin…ValiMax sekuntia. Väli ja valittu id lasketaan hash-funktiolla
        /// jaksonumerosta (ei System.Randomilla): ei tarvitse säilöä siementä sovelluksen ajokertojen yli, mutta
        /// yhden ajastimen sisällä sekvenssi toistuu aina samana.</summary>
        sealed class TehosteAjastin
        {
            readonly TehosteJakso jakso;
            readonly int siemen;
            int jaksoIndeksi;
            double seuraava;
            bool alustettu;

            public TehosteAjastin(TehosteJakso jakso, int siemen) { this.jakso = jakso; this.siemen = siemen; }

            static double Arpa01(int siemen, int n, int kanava)
            {
                unchecked
                {
                    uint h = (uint)siemen * 2654435761u ^ (uint)(n * 40503 + kanava * 9973 + 17);
                    h ^= h >> 15; h *= 2246822519u; h ^= h >> 13; h *= 3266489917u; h ^= h >> 16;
                    return (h & 0xffffff) / (double)0x1000000;
                }
            }

            double Vali(int n) => jakso.ValiMin + (jakso.ValiMax - jakso.ValiMin) * Arpa01(siemen, n, 0);
            string Id(int n) => jakso.AaniIdt[(int)(Arpa01(siemen, n, 1) * jakso.AaniIdt.Count) % jakso.AaniIdt.Count];

            /// <summary>Kutsutaan joka kehys: palauttaa laukaistavan äänen id:n täsmälleen sillä kehyksellä, jolla
            /// väli umpeutuu, muuten null. Ensimmäinen kutsu vain käynnistää ensimmäisen välin (ei soita heti —
            /// speksi: "soittaa ... odottaen seuraavaa"). Seuraava väli lasketaan max(t, seuraava):sta, jottei pitkän
            /// tauon (tila poissa näkyvistä, tai `poikki aika`-pysäytys) jälkeen laukea useita kertoja peräkkäin.</summary>
            public string Paivita(double t)
            {
                if (!alustettu) { alustettu = true; seuraava = t + Vali(0); return null; }
                if (t < seuraava) return null;
                string id = Id(jaksoIndeksi);
                jaksoIndeksi++;
                seuraava = Math.Max(t, seuraava) + Vali(jaksoIndeksi);
                return id;
            }
        }
    }
}
