using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI STONEHENGE (speksi docs/raportit/erikoismallit/stonehenge.md, omistaja hyväksyi 22.0x).
    /// Tunnistus sekunnissa: sarsenkehä (pystykivet ja yhtenäinen kansikivirengas koillisessa, aukkoja lounaassa), sisällä
    /// viisi trilithonia hevosenkengän muodossa, joka avautuu koilliseen; kantapääkivi akselilla koillisessa; matala valli.
    /// Mittakaava tarkennettu speksistä (1,0 = 60 m, ei 110 m): sarsenkehä 33 m → halkaisija 0,55, jotta kehä erottuu 60 pt:ssä
    /// renkaana eikä pisteinä; valli ja kantapääkivi tuotu kehän lähelle (0,44–0,5). Pystyliioittelu 1,8.
    /// Musteella piirretään vain kivet: nurmi ja valli ovat osia ilman ääriviivaa (kartta, ei mitali).
    /// Liikkuvat osat:
    ///   nurmi, valli  paikallaan (ei ääriviivaa)
    ///   lammas1–3     kolme lammasta laiduntaa (perusliike: askel, pysähdys, käännös; lähestyttäessä päät ylös)
    ///   aurinko       auringonnousu kantapääkiven takaa (harvinainen ~1/10 ja napautus)
    ///   sade          kultainen säde maassa kantapääkiveltä kehän läpi (auringonnousun aikana)
    ///   kuu           kalpea kuu samassa suunnassa yöllä
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Juhannusakselin suunta (atsimuutti 50° pohjoisesta itään): yksikkövektori mallin avaruudessa.</summary>
        static readonly Vector3 ShAkseli = new Vector3(Mathf.Sin(50f * Mathf.PI / 180f), 0f, Mathf.Cos(50f * Mathf.PI / 180f));
        const float ShKehaSade = 0.275f, ShKiviKorkeus = 0.123f, ShKansiPaksuus = 0.024f;
        /// <summary>Kantapääkiven paikka (akselilla vallin kohdalla).</summary>
        static Vector3 ShKantapaa => ShAkseli * 0.43f;

        /// <summary>Suunta atsimuutista (astetta pohjoisesta itään) mallin avaruudessa.</summary>
        static Vector3 ShSuunta(float atsimuutti)
        {
            float a = atsimuutti * Mathf.PI / 180f;
            return new Vector3(Mathf.Sin(a), 0f, Mathf.Cos(a));
        }

        /// <summary>Kivi: pohjan keskipiste, tangenttisuunta, leveys, paksuus ja korkeus (Seina keskeltä).</summary>
        static void ShKivi(Rakentaja r, Vector3 p, Vector3 tangentti, float leveys, float paksuus, float korkeus, Color sivu, Color laki)
        {
            var t = new Vector3(tangentti.x, 0f, tangentti.z).normalized * (leveys * 0.5f);
            r.Seina(p - t, p + t, korkeus, paksuus, sivu, laki);
        }

        static readonly Color[] ShKivet = { Hex(0xc4b18c), Hex(0xb7a47f), Hex(0xcdbb96), Hex(0xbba985) };
        static readonly Color ShKiviLaki = Hex(0xe2d6b6);

        static Mesh StonehengeRunko()
        {
            var r = new Rakentaja();
            // Sarsenkehä: 30 paikkaa 12° välein akselista myötäpäivään; pystyssä ne, jotka seisovat nykyään (koillinen lähes
            // ehjä, lounaassa aukkoja), kansikivet ehjinä koillisen kaarella.
            bool[] pysty = new bool[30];
            foreach (int i in new[] { 26, 27, 28, 29, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 15, 16, 21, 22, 23 }) pysty[i] = true;
            Vector3 Keha(int i, float sade) => ShSuunta(50f + i * 12f) * sade;
            // Sarsenkehä (pystykivet ja kansikivet) yhtenä ääriviivaosana: muste kiertää kehän ulkoreunaa.
            r.AloitaOsa();
            for (int i = 0; i < 30; i++)
            {
                if (!pysty[i]) continue;
                var p = Keha(i, ShKehaSade);
                var tangentti = Vector3.Cross(Vector3.up, p);
                ShKivi(r, p, tangentti, 0.034f, 0.024f, ShKiviKorkeus, ShKivet[i % ShKivet.Length], ShKiviLaki);
            }
            // Kansikivet: yhtenäinen kaari pystykivien päällä (27 → 8) ja kaksi yksittäistä.
            foreach (int i in new[] { 26, 27, 28, 29, 0, 1, 2, 3, 4, 5, 6, 7, 10, 22 })
            {
                var a = Keha(i, ShKehaSade) + Vector3.up * ShKiviKorkeus;
                var b = Keha((i + 1) % 30, ShKehaSade) + Vector3.up * ShKiviKorkeus;
                r.Seina(a, b, ShKansiPaksuus, 0.028f, ShKivet[(i + 2) % ShKivet.Length], ShKiviLaki);
            }
            r.LopetaOsa();
            // Kaatuneet kivet makaavat säteen suuntaan.
            foreach (int i in new[] { 13, 18, 19, 25 })
            {
                var p = Keha(i, ShKehaSade + 0.045f);
                var s = p.normalized;
                r.Seina(p - s * 0.05f, p + s * 0.05f, 0.022f, 0.034f, ShKivet[i % ShKivet.Length], ShKiviLaki);
            }

            // Trilithonit: hevosenkenkä kehän sisällä (säde 0,135), avautuu koilliseen; suurin lounaassa (akseli + 180°).
            var trilithonit = new (float kulma, float korkeus, bool ehja)[]
            {
                (180f, 0.225f, false), (132f, 0.19f, true), (228f, 0.19f, true), (84f, 0.165f, true), (276f, 0.165f, true),
            };
            r.AloitaOsa();
            foreach (var (kulma, h, ehja) in trilithonit)
            {
                var suunta = ShSuunta(50f + kulma);
                var keski = suunta * 0.135f;
                var tangentti = Vector3.Cross(Vector3.up, suunta).normalized;
                var vasen = keski - tangentti * 0.026f;
                var oikea = keski + tangentti * 0.026f;
                ShKivi(r, vasen, tangentti, 0.036f, 0.03f, h, ShKivet[1], ShKiviLaki);
                if (ehja)
                {
                    ShKivi(r, oikea, tangentti, 0.036f, 0.03f, h, ShKivet[2], ShKiviLaki);
                    r.Seina(vasen - tangentti * 0.02f + Vector3.up * h, oikea + tangentti * 0.02f + Vector3.up * h, 0.026f, 0.03f, ShKivet[0], ShKiviLaki);
                }
                else
                {
                    // Suuri trilithon: toinen pystykivi ja kansikivi kaatuneina keskelle (kuten nykyään).
                    var maassa = keski - suunta * 0.06f;
                    r.Seina(maassa - tangentti * 0.055f, maassa + tangentti * 0.055f, 0.024f, 0.036f, ShKivet[3], ShKiviLaki);
                    var kansi = keski - suunta * 0.02f + tangentti * 0.05f;
                    r.Seina(kansi - suunta * 0.04f, kansi + suunta * 0.04f, 0.02f, 0.028f, ShKivet[0], ShKiviLaki);
                }
            }
            r.LopetaOsa();
            // Kantapääkivi akselilla ja kaksi asemakiveä.
            r.Kallio(ShKantapaa, 0.05f, 0.042f, 0.034f, 0.03f, 0.105f, 6, 5, ShKivet[3], ShKiviLaki);
            foreach (float kulma in new[] { 50f + 125f, 50f - 55f })
                ShKivi(r, ShSuunta(kulma) * 0.39f, Vector3.Cross(Vector3.up, ShSuunta(kulma)), 0.026f, 0.02f, 0.05f, ShKivet[0], ShKiviLaki);
            return r.Verkko("Stonehenge");
        }

        /// <summary>Nurmi vallin sisällä (osa ilman ääriviivaa).</summary>
        static Mesh StonehengeNurmi()
        {
            var r = new Rakentaja();
            r.Kiekko(new Vector3(0f, 0.002f, 0f), 0.44f, 0.44f, 28, EmRuoho);
            return r.Verkko("Stonehenge-nurmi");
        }

        /// <summary>Valli: matala rengas (sisärinne, laki, ulkorinne) 0,44–0,5 ja aukko koillisessa akselin kohdalla.</summary>
        static Mesh StonehengeValli()
        {
            var r = new Rakentaja();
            const int n = 30;
            float[] sade = { 0.44f, 0.458f, 0.482f, 0.5f };
            float[] kork = { 0.002f, 0.014f, 0.014f, 0.002f };
            for (int i = 0; i < n; i++)
            {
                float a0 = i * 360f / n, a1 = (i + 1) * 360f / n;
                // Aukko akselin kohdalla (avenue).
                float keski = (a0 + a1) * 0.5f;
                float ero = Mathf.Abs(((keski - 50f) % 360f + 540f) % 360f - 180f);
                if (ero < 10f) continue;
                for (int k = 0; k < 3; k++)
                {
                    Vector3 p00 = ShSuunta(a0) * sade[k] + Vector3.up * kork[k], p01 = ShSuunta(a1) * sade[k] + Vector3.up * kork[k];
                    Vector3 p10 = ShSuunta(a0) * sade[k + 1] + Vector3.up * kork[k + 1], p11 = ShSuunta(a1) * sade[k + 1] + Vector3.up * kork[k + 1];
                    r.NelioUlos(p00, p10, p11, p01, Vector3.up, k == 1 ? EmVallinLaki : EmValli);
                }
            }
            return r.Verkko("Stonehenge-valli");
        }

        /// <summary>Lammas: vaalea runko ja tumma pää (+Z eteen), pivot maassa keskellä.</summary>
        static Mesh StonehengeLammas()
        {
            var r = new Rakentaja();
            r.Laatikko(new Vector3(0f, 0.008f, 0f), new Vector3(0.018f, 0.016f, 0.03f), EmVaahto, EmVaahto);
            r.Laatikko(new Vector3(0f, 0.013f, 0.019f), new Vector3(0.01f, 0.01f, 0.01f), EmMuste, EmMuste);
            return r.Verkko("Stonehenge-lammas");
        }

        /// <summary>Aurinko: kultainen kahdeksankulmainen kaksoispyramidi (näkyy ylhäältä ja sivulta); pivot keskellä.</summary>
        static Mesh StonehengeAurinko()
        {
            var r = new Rakentaja();
            r.Timantti(Vector3.zero, 0.036f, 0.036f, EmKulta, 8);
            return r.Verkko("Stonehenge-aurinko");
        }

        /// <summary>Kuu: sama muoto kalpeana.</summary>
        static Mesh StonehengeKuu()
        {
            var r = new Rakentaja();
            r.Timantti(Vector3.zero, 0.03f, 0.03f, EmVaahto, 8);
            return r.Verkko("Stonehenge-kuu");
        }

        /// <summary>Säde: kultainen kaista maassa kantapääkiveltä (pivot) kehän keskustan läpi lounaaseen (0,62 akselia pitkin),
        /// levenee kohti keskustaa; animaatio skaalaa sen pivotista (kivestä) esiin.</summary>
        static Mesh StonehengeSade()
        {
            var r = new Rakentaja();
            var sivu = Vector3.Cross(Vector3.up, ShAkseli).normalized;
            Vector3 y = Vector3.up * 0.004f, loppu = -ShAkseli * 0.62f;
            r.NelioUlos(-sivu * 0.016f + y, sivu * 0.016f + y, loppu + sivu * 0.035f + y, loppu - sivu * 0.035f + y, Vector3.up, EmKulta);
            return r.Verkko("Stonehenge-sade");
        }

        /// <summary>Lampaiden lepopaikat (vallin sisällä lounaassa ja etelässä).</summary>
        static readonly Vector3[] ShLampaat = { ShSuunta(200f) * 0.36f, ShSuunta(225f) * 0.38f, ShSuunta(160f) * 0.37f };

        /// <summary>
        /// Liikkuvat osat (Natiivisepän rajapinta). Liikkeen laskee Linssisepän liikeydin avaimen ja osan nimen mukaan.
        /// Säteen pivot on kantapääkivessä, ja se on rakennettu suoraan akselin suuntaan: animoija skaalaa sen kivestä esiin.
        /// </summary>
        static LiikkuvaOsaMaaritys[] StonehengeOsat() => new[]
        {
            new LiikkuvaOsaMaaritys { Nimi = "nurmi", Verkko = StonehengeNurmi, Pivot = Vector3.zero, Liike = Liike.Liuku },
            new LiikkuvaOsaMaaritys { Nimi = "valli", Verkko = StonehengeValli, Pivot = Vector3.zero, Liike = Liike.Liuku },
            new LiikkuvaOsaMaaritys { Nimi = "lammas1", Verkko = StonehengeLammas, Pivot = ShLampaat[0], Liike = Liike.Liuku, Akseli = Vector3.forward,
                Laajuus = 0.04f, KayS = 6f, TaukoS = 20f },
            new LiikkuvaOsaMaaritys { Nimi = "lammas2", Verkko = StonehengeLammas, Pivot = ShLampaat[1], Liike = Liike.Liuku, Akseli = Vector3.forward,
                Laajuus = 0.04f, KayS = 6f, TaukoS = 25f },
            new LiikkuvaOsaMaaritys { Nimi = "lammas3", Verkko = StonehengeLammas, Pivot = ShLampaat[2], Liike = Liike.Liuku, Akseli = Vector3.forward,
                Laajuus = 0.04f, KayS = 6f, TaukoS = 30f },
            new LiikkuvaOsaMaaritys { Nimi = "aurinko", Verkko = StonehengeAurinko, Pivot = ShAkseli * 0.5f, Liike = Liike.Nousu, Akseli = Vector3.up,
                Laajuus = 0.11f, KayS = 28f, TaukoS = 80f },
            new LiikkuvaOsaMaaritys { Nimi = "sade", Verkko = StonehengeSade, Pivot = ShKantapaa, Liike = Liike.Aalto, Akseli = -ShAkseli, Laajuus = 1f },
            new LiikkuvaOsaMaaritys { Nimi = "kuu", Verkko = StonehengeKuu, Pivot = ShAkseli * 0.5f + Vector3.up * 0.1f, Liike = Liike.Valahdys },
        };

        static readonly bool stonehenge = Rekisteroi("stonehenge",
            new Erikoismalli { Runko = StonehengeRunko, Osat = StonehengeOsat, Kolmiot0 = 858, KokoKerroin = 1.5f });
    }
}
