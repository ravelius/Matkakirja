using System;
using System.Threading;

namespace Matkakirja
{
    /// <summary>
    /// LÖYDÖS 176 (P0, Natiiviseppä 26.9.2026): paikallisen laattapalvelimen PORTTIJAKO. Puhtaat päätökset Laattapalvelimelle
    /// (ei UnityEngineä; Kartta-testit/Testit/LaattaPortitTestit.cs).
    ///
    /// JUURISYY (proto-3d/lokit/loydos176/RAPORTTI.md): kylmällä välimuistilla Cesiumin laattahaut paikalliseen palvelimeen
    /// kulkivat noin kuuden rinnakkaisen yhteyden läpi (palvelimella `käynnissä` enintään 6, sen omat jonot tyhjät, Cesiumin
    /// työjonossa 100–250 laattaa). Kaikki kerrokset menivät samaan osoitteeseen 127.0.0.1:portti, joten iOS:n NSURLSessionin
    /// (UnityWebRequest) yhteysraja samaan isäntään oli todennäköisesti pullonkaula: hitaat kermahaut verkosta varasivat
    /// yhteydet, ja paketista tulevat pohja- ja maastolaatat jonottivat niiden takana.
    ///
    /// KORJAUS: palvelin kuuntelee <see cref="Maara"/> porttia samalla käsittelijällä, ja jokainen luokka (<see cref="Nimet"/>)
    /// saa oman porttinsa eli oman isäntäavaimensa (isäntä + portti) ja siten oman yhteyspoolinsa. Palvelimen jonot (näkyvä,
    /// kiire, esilataus, tausta, VARTIJA 163b ja 171) ovat ennallaan ja yhteiset kaikille porteille.
    /// Kehittäjälippu Documents/<see cref="YksiPorttiTiedosto"/> tai PlayerPrefs <see cref="YksiPorttiAvain"/> = 1 palauttaa
    /// vanhan yhden portin tilan (A/B-mittaus).
    /// </summary>
    public static class LaattaPortit
    {
        /// <summary>Porttien (luokkien) määrä.</summary>
        public const int Maara = 4;
        /// <summary>Luokkien nimet lokiriveille, indeksi = portin järjestysnumero.</summary>
        public static readonly string[] Nimet = { "pohja", "maasto", "kerma", "muu" };
        public const int Pohja = 0, Maasto = 1, Kerma = 2, Muu = 3;

        /// <summary>Kehittäjälippu (Documents): yksi portti kuten ennen löydöstä 176 (sisältö "0" = porttijako, muu = yksi portti).</summary>
        public const string YksiPorttiTiedosto = "yksi-portti.txt";
        /// <summary>Kehittäjälippu (PlayerPrefs, 1 = yksi portti; komento "palvelin yksiportti paalle|pois").</summary>
        public const string YksiPorttiAvain = "matkakirja-yksi-portti";

        /// <summary>
        /// Näkyvän kartan jonon rinnakkaiset verkkohaut vähintään, kun portteja on useita. Ennen Cesiumin yhteyksiä oli noin 6
        /// (yksi isäntä), nyt enintään 4 × 6 = 24, joten palvelimen 12 (Pallo.unity rinnakkain) + kiirejonon 4 olisi uusi
        /// pullonkaula verkosta haettaville laatoille. Nostetaan maltillisesti 16:een (+ kiire 4 = 20 = Cesiumin
        /// maximumSimultaneousTileLoads). Ämpäri (media.matkakirja.app) vastaa HTTP/2:lla, joten lähtevät haut jakavat yhden
        /// yhteyden. Yhden portin tilassa raja on ennallaan (B-mittaus = vanha käytös).
        /// </summary>
        public const int NakyvaMonellaPortilla = 16;

        /// <summary>Näkyvän kartan jonon rinnakkaisuus porttien määrän mukaan (ks. <see cref="NakyvaMonellaPortilla"/>).</summary>
        public static int NakyvaRinnakkain(int rinnakkain, int portteja) =>
            portteja > 1 ? Math.Max(rinnakkain, NakyvaMonellaPortilla) : rinnakkain;

        /// <summary>
        /// Ämpärin polun (ilman ämpärin osoitetta; saa sisältää {z}/{x}/{y}-paikat ja kyselyn) portti-indeksi:
        /// kerma (Varitaso, julisteet/pallo/kerma/) → <see cref="Kerma"/>, maasto (julisteet/maasto/, .terrain, layer.json)
        /// → <see cref="Maasto"/>, pohja ja sileä pohja (julisteet/pallo/laatat/) → <see cref="Pohja"/>, muut (satelliitti eli
        /// lennon pinta, vektorit, napakalotit, laatat.json-listat, mallit) → <see cref="Muu"/>. Maaston laatat tulevat samasta
        /// portista kuin layer.json, koska Cesium ratkaisee niiden osoitteet layer.jsonin suhteen.
        /// </summary>
        public static int Luokka(string polku)
        {
            if (string.IsNullOrEmpty(polku)) return Muu;
            int q = polku.IndexOf('?');
            string p = q >= 0 ? polku.Substring(0, q) : polku;
            if (p.StartsWith("/", StringComparison.Ordinal)) p = p.Substring(1);
            if (p.StartsWith("julisteet/pallo/kerma/", StringComparison.Ordinal)) return Kerma;
            if (p.StartsWith("julisteet/maasto/", StringComparison.Ordinal) || p.EndsWith(".terrain", StringComparison.Ordinal)
                || p == "layer.json" || p.EndsWith("/layer.json", StringComparison.Ordinal)) return Maasto;
            if (p.StartsWith("julisteet/pallo/laatat/", StringComparison.Ordinal)) return Pohja;
            return Muu;
        }

        /// <summary>
        /// Portti-indeksin <paramref name="i"/> ensisijainen portti: ensimmäinen (käyttöjärjestelmän antama) + i, jos se on
        /// kelvollinen; muuten 0 (käyttöjärjestelmä valitsee vapaan). Varattu portti → kutsuja yrittää 0:lla.
        /// </summary>
        public static int PorttiEhdokas(int ensimmainen, int i) =>
            i <= 0 ? ensimmainen : ensimmainen > 0 && ensimmainen + i <= 65535 ? ensimmainen + i : 0;

        /// <summary>
        /// Laskuri ja sen huiput (löydös 176, varmistuslaskurit): nykyinen arvo, huippu lukijakohtaisessa ikkunassa (lukija nollaa
        /// oman ikkunansa lukiessaan: 0 = komento "palvelin", 1 = valmius-rivi) ja koko istunnon huippu. Säieturvallinen.
        /// </summary>
        public sealed class Huippu
        {
            public const int Lukijoita = 2;
            int nyt, istunto;
            readonly int[] ikkuna = new int[Lukijoita];

            public int Nyt => Volatile.Read(ref nyt);
            public int Istunto => Volatile.Read(ref istunto);

            public void Lisaa()
            {
                int n = Interlocked.Increment(ref nyt);
                Nosta(ref istunto, n);
                for (int i = 0; i < Lukijoita; i++) Nosta(ref ikkuna[i], n);
            }

            public void Vahenna() => Interlocked.Decrement(ref nyt);

            /// <summary>Lukijan ikkunan huippu (vähintään nykyinen arvo); nollaa ikkunan nykyiseen arvoon.</summary>
            public int Ikkuna(int lukija)
            {
                int n = Nyt;
                int h = Interlocked.Exchange(ref ikkuna[lukija], n);
                return Math.Max(h, n);
            }

            static void Nosta(ref int kohde, int arvo)
            {
                int vanha;
                do { vanha = Volatile.Read(ref kohde); if (arvo <= vanha) return; }
                while (Interlocked.CompareExchange(ref kohde, arvo, vanha) != vanha);
            }
        }
    }
}
