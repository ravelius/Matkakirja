// LINNAN LAATU MUISTIBUDJETIN MUKAAN (omistaja 8.10.2026 19.5x: "Tee ja ota käyttöön kaikki mahdolliset grafiikan parannukset
// ja lisää muistin käyttöä niin paljon kuin pystyy"; Natiiviseppä). Puhdas laskenta, Unity-kääre Linssit/Unity/LinnaMuisti.cs.
//
// SITOVA REUNAEHTO (omistaja 30.9., DioraamaLaatu.cs): "älä pudota laatua yhtään". Budjetti saa NOSTAA laiteluokan tasoa
// (iPhone 15 Pro, A-sarjan iPadit, iPhone 16/17:n puhelinkevennykset), mutta laiteluokan taso pysyy alarajana, paitsi jos
// laiteluokan oma arvioitu tarve ei mahdu vapaaseen muistiin marginaalin jälkeen (jetsam-vaara) → suurin mahtuva porras.
// vapaaMt = −1 (editori, simulaattori, Mac ilman tietoa) → laiteluokan taso täsmälleen ennallaan.
//
// PORTAAT (komponentit kasvavat portaittain; tarve = linnan oma lisäys avauksen hetken vapaaseen muistiin):
//   0 turva   kevyt kuori,    puolikkaat pinnat, puhelinkevennykset, ei detaljinormaaleja   ~540 Mt (LS2 8.10.: mitattu 297)
//   1         normaali kuori, puolikkaat pinnat, puhelinkevennykset                          ~630 Mt (mitattu 390)
//   2         normaali kuori, täydet pinnat,     puhelinkevennykset                          ~700 Mt (mitattu 444)
//   3         huippukuori,    täydet pinnat,     puhelinkevennykset, detaljinormaalit        ~860 Mt (mitattu 510; iPhone 16/17 ennen)
//   4         huippukuori,    täydet pinnat,     ei kevennyksiä,     detaljinormaalit        ~1020 Mt (mitattu 639; M-iPad ennen)
// ARVIOT (Mt, GPU-muisti + hallitun keon kasvu, joka ei Boehm-GC:llä palaudu käyttöjärjestelmälle; paketti iPad ~430 Mt,
// iPhone ~190 Mt, DioraamaEsilataus): perus 400 = tilojen glb:t, 3D-hahmot animaatioineen, äänet, puut, aluskasvit, horisontti,
// taivas, URP:n renderöintikohteet ja glb-jäsennyksen keko. Kuori+maasto: kevyt 50 (150 k kolmiota, 2k-atlas), normaali 145
// (400 k, 4k-atlas 22 Mt, heijastus 0,33), huippu 350 (1,35 M kolmiota ~55 Mt, 8k ASTC-mipketju 89 Mt, glb 107 Mt ja jäsennys-
// taulukot hallitussa muistissa, heijastus 0,5; kevennyksellä ylin mip pois → 4k, −67). Orto: kevyt 6, normaali 22, huippu 89
// (8k; kevennyksellä 22). Pinnat + 8 valoatlasta: täydet 270 (pinnat 89 + 8 × 4k ASTC 22), puolikkaat 70. Detaljinormaalit 25.
// Täysi vene ja lisämallit 30. Kalibrointi: LinnaMuisti kirjaa sulkiessa pienimmän vapaan ("pienin vapaa") → säädä vakioita.
using System;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Kuoren taso (sama järjestys kuin DioraamaUlkokuori.Laatu).</summary>
    public enum KuoriTaso { Kevyt = 0, Normaali = 1, Huippu = 2 }

    /// <summary>Linnan laatuvalinnat yhdellä istunnolla (LinnaMuistibudjetti.Laske).</summary>
    public readonly struct LinnaLaatu
    {
        public readonly KuoriTaso Kuori;
        /// <summary>Täydet pintatekstuurit ja 4k-valoatlakset (false = puolikkaat, entinen DioraamaSovitin.PieniLaite).</summary>
        public readonly bool TaydetPinnat;
        /// <summary>Puhelinkevennykset pois: huippukuoren 8k-atlas ylin mip mukaan, huipun 8k-orto, täysi vene ja lisämallit.</summary>
        public readonly bool RajoituksetPois;
        /// <summary>Täysi laatu (DioraamaLaatu.Taysi): kuoren detaljinormaalit.</summary>
        public readonly bool Taysi;
        /// <summary>Vapaa muisti jetsam-rajaan laskentahetkellä (Mt), −1 = ei tiedossa.</summary>
        public readonly int VapaaMt;
        /// <summary>Linnalle käytettävissä: vapaa − marginaali (Mt), −1 = ei tiedossa.</summary>
        public readonly int BudjettiMt;
        /// <summary>Valitun tason arvioitu tarve (Mt).</summary>
        public readonly int TarveMt;
        /// <summary>Lokiin: miksi tämä taso ("laiteluokka", "nosto", "laiteluokan taso", "vähän muistia", "HÄTÄ").</summary>
        public readonly string Peruste;

        public LinnaLaatu(KuoriTaso kuori, bool taydetPinnat, bool rajoituksetPois, bool taysi, int vapaaMt = -1, int budjettiMt = -1, int tarveMt = 0, string peruste = null)
        {
            Kuori = kuori; TaydetPinnat = taydetPinnat; RajoituksetPois = rajoituksetPois; Taysi = taysi;
            VapaaMt = vapaaMt; BudjettiMt = budjettiMt; TarveMt = tarveMt; Peruste = peruste;
        }

        /// <summary>Sama laatu (komponentit, ei lokikenttiä).</summary>
        public bool SamaLaatu(LinnaLaatu b) => Kuori == b.Kuori && TaydetPinnat == b.TaydetPinnat && RajoituksetPois == b.RajoituksetPois && Taysi == b.Taysi;

        public override string ToString() =>
            $"kuori {Kuori.ToString().ToLowerInvariant()}, pinnat {(TaydetPinnat ? "täydet" : "puolikkaat")}, " +
            $"kevennykset {(RajoituksetPois ? "pois" : "päällä")}, normaalit {(Taysi ? "päällä" : "pois")}";
    }

    public static class LinnaMuistibudjetti
    {
        /// <summary>Marginaali vapaasta muistista: max(MarginaaliMinMt, MarginaaliOsuus × vapaa). Kattaa kartan ja UI-kuvien
        /// kasvun linnan aikana (kuvien LRU 200–300 Mt), latauspiikit ja muistivaroituksen rajan (~500 Mt ennen jetsamia).</summary>
        public const int MarginaaliMinMt = 700;
        public const double MarginaaliOsuus = 0.15;
        /// <summary>Hätävahti linnan ollessa auki: vapaa alle tämän → kuvien LRU pienemmäksi (ei tason vaihtoa kesken).</summary>
        public const int HataMt = 500;

        // Tarpeen osat (Mt), ks. alkukommentti. LS2:n mittaus paketista v45i 8.10.2026 (linssiseppa2/muistitesti 4a74f594e, GPU-tekstuurit
        // + glb pelin valintasäännöin): kevyt kuori 62 (detalji latautuu myös kevyellä: 2k RGBA32-maski 21 + diffit 21) → 65; pinnat ja
        // valoatlakset täydet 96 / puolikkaat 42 (valoatlakset 5–10 Mt, ei 22) → 130 / 60 (~35 % varaa). Perus 400 sisältää 3D-hahmot
        // 66 Mt (RGBA32; ASTC säästäisi ~50) ja ajonaikaiset puskurit; muut osat mitattua väljempiä (kuori+maasto 128/237, orto 21/85).
        public const int PerusMt = 400;
        public const int KuoriKevytMt = 65, KuoriNormaaliMt = 145, KuoriHuippuMt = 350, HuipunYlinMipMt = 67;
        public const int OrtoKevytMt = 6, OrtoNormaaliMt = 22, OrtoHuippuMt = 89;
        public const int PinnatTaydetMt = 150, PinnatPuolikkaatMt = 70;
        public const int NormaalitMt = 25, VeneMt = 30;
        /// <summary>Ultran 8K-valoatlakset ylimmällä portaalla (LS2 v45o 8.10.: 4 × 8K ASTC 6×6 mipeineen +131 Mt → 135); Siirtoseppä lataa
        /// ne vain, kun Laatutaso.Ultra ja budjetti valitsi ylimmän portaan (siirtoseppa/juna168-v45o 2406bf795).</summary>
        public const int UltraAtlaksetMt = 135;

        /// <summary>Portaat alhaalta ylös (komponentit kasvavat; ks. alkukommentti).</summary>
        public static readonly LinnaLaatu[] Portaat =
        {
            new LinnaLaatu(KuoriTaso.Kevyt, false, false, false),
            new LinnaLaatu(KuoriTaso.Normaali, false, false, false),
            new LinnaLaatu(KuoriTaso.Normaali, true, false, false),
            new LinnaLaatu(KuoriTaso.Huippu, true, false, true),
            new LinnaLaatu(KuoriTaso.Huippu, true, true, true),
        };

        public static int Marginaali(int vapaaMt) => Math.Max(MarginaaliMinMt, (int)Math.Round(vapaaMt * MarginaaliOsuus));

        /// <summary>Arvioitu muistitarve (Mt) laatuvalinnoille.</summary>
        public static int Tarve(LinnaLaatu l, bool ultra = false)
        {
            int t = PerusMt;
            t += l.Kuori == KuoriTaso.Huippu ? KuoriHuippuMt - (l.RajoituksetPois ? 0 : HuipunYlinMipMt)
               : l.Kuori == KuoriTaso.Normaali ? KuoriNormaaliMt : KuoriKevytMt;
            t += l.Kuori == KuoriTaso.Huippu ? (l.RajoituksetPois ? OrtoHuippuMt : OrtoNormaaliMt)
               : l.Kuori == KuoriTaso.Normaali ? OrtoNormaaliMt : OrtoKevytMt;
            t += l.TaydetPinnat ? PinnatTaydetMt : PinnatPuolikkaatMt;
            if (l.Taysi) t += NormaalitMt;
            if (ultra && l.SamaLaatu(Portaat[Portaat.Length - 1])) t += UltraAtlaksetMt;
            if (l.RajoituksetPois) t += VeneMt;
            return t;
        }

        /// <summary>Laiteluokan taso (ennen 8.10.): DioraamaLaatu.Taysi, DioraamaUlkokuori.Automaattinen (RAM ≥ 3500 → normaali),
        /// DioraamaSovitin.PieniLaite (näyttö alle 4 M pikseliä tai RAM alle 6000 Mt) ja puhelinkevennykset iPhonella.</summary>
        public static LinnaLaatu Laiteluokka(string malli, int ramMt, bool nykyinenTaysi, long naytonPikselit)
        {
            var kuori = nykyinenTaysi ? KuoriTaso.Huippu : ramMt >= 3500 ? KuoriTaso.Normaali : KuoriTaso.Kevyt;
            bool pieni = !nykyinenTaysi && (naytonPikselit < 4_000_000L || ramMt < 6000);
            bool puhelin = malli != null && malli.StartsWith("iPhone", StringComparison.Ordinal);
            return new LinnaLaatu(kuori, !pieni, !puhelin, nykyinenTaysi);
        }

        /// <summary>Komponenteittain parempi kahdesta.</summary>
        public static LinnaLaatu Max(LinnaLaatu a, LinnaLaatu b) =>
            new LinnaLaatu((KuoriTaso)Math.Max((int)a.Kuori, (int)b.Kuori), a.TaydetPinnat || b.TaydetPinnat, a.RajoituksetPois || b.RajoituksetPois, a.Taysi || b.Taysi);

        /// <summary>Linnan laatu vapaan muistin mukaan. vapaaMt −1 = ei tiedossa → laiteluokka sellaisenaan.</summary>
        public static LinnaLaatu Laske(int vapaaMt, string malli, int ramMt, bool nykyinenTaysi, long naytonPikselit, bool ultra = false)
        {
            var luokka = Laiteluokka(malli, ramMt, nykyinenTaysi, naytonPikselit);
            if (vapaaMt < 0) return Tulos(luokka, -1, -1, ultra, "laiteluokka (vapaa muisti ei tiedossa)");
            int budjetti = vapaaMt - Marginaali(vapaaMt);
            if (Tarve(luokka, ultra) <= budjetti)
            {
                // Laiteluokka mahtuu: suurin porras, jonka ja laiteluokan yhdistelmä mahtuu (porras 0 + luokka = luokka → aina löytyy).
                for (int p = Portaat.Length - 1; p >= 0; p--)
                {
                    var ehdokas = Max(luokka, Portaat[p]);
                    if (Tarve(ehdokas, ultra) <= budjetti)
                        return Tulos(ehdokas, vapaaMt, budjetti, ultra, ehdokas.SamaLaatu(luokka) ? "laiteluokan taso" : $"nosto (porras {p})");
                }
            }
            // Jetsam-vaara: laiteluokan taso ei mahdu → suurin mahtuva porras, viimeisenä turvataso.
            for (int p = Portaat.Length - 1; p >= 1; p--)
                if (Tarve(Portaat[p], ultra) <= budjetti) return Tulos(Portaat[p], vapaaMt, budjetti, ultra, $"vähän muistia (porras {p})");
            return Tulos(Portaat[0], vapaaMt, budjetti, ultra, "HÄTÄ: turvataso");
        }

        static LinnaLaatu Tulos(LinnaLaatu l, int vapaa, int budjetti, bool ultra, string peruste) =>
            new LinnaLaatu(l.Kuori, l.TaydetPinnat, l.RajoituksetPois, l.Taysi, vapaa, budjetti, Tarve(l, ultra), peruste);
    }
}
