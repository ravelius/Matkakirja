// PALLON LENTOÄÄNET, SOUNDLY-ERÄ 1c (Linssiseppä 10.10.2026; PT 9.10., Pelikoodarin aanet/pallo-lento-soundly-v1/manifest.json, Soundly Pro,
// −23 LUFS, silmukat saumattomina). Korin omat äänet PalloKoriin (manifestin kaksitaso- ja ilmavirtaäänet lento v3:lle, ei tässä):
//   poltin-humahdus-01…04   kerta, liekin syttyessä (Poltin.Syttyi), vaihtoehdot ilman peräkkäistä toistoa; korvaa Resources-humahduksen
//   poltin-palaa-lahi       silmukka liekin palaessa, taso × Poltin.Taso (nousee ja hiipuu liekin mukana)
//   kori-keinunta           silmukka vain liikkeen muutoksessa (omistaja TF 163: narina hiljaa, ei jatkuvasti); korvaa korin narinan.
//                           v2 (simu 10.10. 02.4x: tasaisessa lennossa kiihtyvyys 1,1–1,5 m/s² → keinunta soi 20 s): aalto alkaa vain
//                           kiihtyvyyden noustessa KeinuntaAlkaa-rajan yli levosta (hystereesi: uusi vasta, kun käynyt alle KeinuntaLepo),
//                           kestää KeinuntaAaltoS, vähintään KeinuntaValiS välein;
//                           yli PiikkiRaja = origon siirto tai teleportti (simu: 296 ja 374 m/s²), ei liikettä.
// Puuttuva manifesti tai tiedosto = vanhat Resources-äänet. Mikseri (pallo, tehosteet): humahdukset samaan kori.poltin-ääneen kuin ennen.
// Puhdas C#: PalloLentoAanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class PalloLentoAanet
    {
        public const string Juuri = "https://media.matkakirja.app/aanet/pallo-lento-soundly-v1/";
        public const string ManifestiOsoite = Juuri + "manifest.json";

        public sealed class Aani { public string Tunnus, Polku; public bool Silmukka; public double KestoS; public string Osoite => Juuri + Polku; }
        public readonly Dictionary<string, Aani> Aanet = new Dictionary<string, Aani>(StringComparer.Ordinal);

        public static readonly string[] Humahdukset = { "poltin-humahdus-01", "poltin-humahdus-02", "poltin-humahdus-03", "poltin-humahdus-04" };
        public const string PalaaLahi = "poltin-palaa-lahi", Keinunta = "kori-keinunta";

        public static readonly (string Id, string Ryhma, string Nimi, string[] Klipit)[] Mikseri =
        {
            ("kori.poltin", "tehosteet", "Polttimen liekki", Humahdukset),
            ("kori.poltin-palaa", "tehosteet", "Polttimen liekki palaa", new[] { PalaaLahi }),
            ("kori.keinunta", "tehosteet", "Korin keinunta", new[] { Keinunta }),
        };

        public static IEnumerable<string> Tunnukset() { foreach (var m in Mikseri) foreach (var k in m.Klipit) yield return k; }

        public static (string Id, string Ryhma) MikseriAani(string tunnus)
        {
            foreach (var m in Mikseri) if (Array.IndexOf(m.Klipit, tunnus) >= 0) return (m.Id, m.Ryhma);
            return (null, null);
        }

        public static PalloLentoAanet Lue(string json)
        {
            var m = new PalloLentoAanet();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(json)), "aanet")))
            {
                var d = MiniJson.ObjektiTaiNull(o); if (d == null) continue;
                var a = new Aani { Tunnus = MiniJson.Teksti(d, "tunnus"), Polku = MiniJson.Teksti(d, "aani"), KestoS = MiniJson.Luku(d, "kesto_s") ?? 0,
                    Silmukka = MiniJson.Kentta(d, "silmukka") is bool b && b };
                if (!string.IsNullOrEmpty(a.Tunnus) && !string.IsNullOrEmpty(a.Polku)) m.Aanet[a.Tunnus] = a;
            }
            return m;
        }

        // ---- tasot (PalloKorin Soita-asteikolla: humahdus 0,8 kuten ennen; narina NarinaTaso 0,25) ----
        public const double HumahdusTaso = 0.8, PalaaTaso = 0.35, KeinuntaTaso = 0.5, KeinuntaAlkaa = 1.2, KeinuntaLepo = 0.8, KeinuntaTaysi = 4.0,
            KeinuntaAaltoS = 4.0, KeinuntaValiS = 12.0, PiikkiRaja = 50.0;
        public const double PalaaLiukuS = 0.25, KeinuntaLiukuS = 1.5;

        /// <summary>Palamisen silmukan taso liekin voimakkuudesta 0–1.</summary>
        public static double Palaa(double liekki) => PalaaTaso * Math.Max(0, Math.Min(1, liekki));

        /// <summary>Keinunta-aallot: Paivita joka kehys (aika s, vaakakiihtyvyys m/s²) → tavoitetaso; aalto vain rajan ylityksessä.</summary>
        public sealed class KeinuntaAallot
        {
            double loppuu = double.NegativeInfinity, edellinen = double.NegativeInfinity, taso; bool yli;
            public bool Soi { get; private set; }
            public double Paivita(double nyt, double kiihtyvyys, double narinaTaso)
            {
                if (kiihtyvyys > PiikkiRaja) kiihtyvyys = 0;   // origon siirto, ei liikettä
                bool nousu = !yli && kiihtyvyys > KeinuntaAlkaa;
                if (nousu) yli = true; else if (kiihtyvyys < KeinuntaLepo) yli = false;
                if (nousu && nyt - edellinen >= KeinuntaValiS) { edellinen = nyt; loppuu = nyt + KeinuntaAaltoS; taso = KeinuntaKiihtyvyydesta(Math.Max(kiihtyvyys, KeinuntaAlkaa + 0.5), narinaTaso); }
                Soi = nyt < loppuu;
                return Soi ? taso : 0;
            }
        }

        /// <summary>Keinunnan taso vaakakiihtyvyydestä (m/s²): hiljaa alle kynnyksen (ei jatkuvaa narinaa), täysi KeinuntaTaysi:ssä.</summary>
        public static double KeinuntaKiihtyvyydesta(double kiihtyvyys, double narinaTaso)
            => KeinuntaTaso * narinaTaso * Math.Max(0, Math.Min(1, (kiihtyvyys - KeinuntaAlkaa) / (KeinuntaTaysi - KeinuntaAlkaa)));
    }
}
