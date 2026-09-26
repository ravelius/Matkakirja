using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI MONT-SAINT-MICHEL (speksi docs/raportit/erikoismallit/mont-saint-michel.md, omistaja hyväksyi 22.0x).
    /// Tunnistus sekunnissa: kartiomainen kalliosaari, jonka huipulla luostarikirkko ja hoikka torni kultaisine
    /// Mikael-patsaineen; muurirengas ja tornit etelä- ja itärannalla; talorivit kiipeävät kierteistä pääkatua kirkkoa
    /// kohti; pohjoisrinteellä korkea La Merveille; ympärillä vuorovesihiekka ja etelään silta.
    /// Mitat: saari 320 × 260 m (yksikkö 1,0 = 320 m, hiekkakiekko 1,0), pystyliioittelu 1,6 (tornin huippu 157 m → 0,785).
    /// Liikkuvat osat (Tivolin logiikka Linssisepän liikeytimessä):
    ///   vesi    vuorovesi: rengas saaren ympärillä nousee hiekan alta ja laskee (perusliike)
    ///   vaahto  kevätvuoksen vaahtoviiva kiertää saarta kohti (harvinainen, ~1/10, ja napautus)
    ///   patsas  Mikael-patsaan pehmeä kultahehku vuoron huipulla
    ///   valot   ikkunoiden lämmin hehku yöllä
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Kallion kerrokset (y, keskipiste x/z, puoliakselit): laki pohjoiseen keskeltä, joten pohjoisrinne on jyrkkä.</summary>
        static readonly (float y, float cx, float cz, float rx, float rz)[] MsmKallio =
        {
            (0.00f, 0.000f, 0.000f, 0.385f, 0.315f),
            (0.06f, 0.000f, 0.012f, 0.345f, 0.280f),
            (0.15f, 0.010f, 0.038f, 0.255f, 0.200f),
            (0.25f, 0.018f, 0.058f, 0.170f, 0.130f),
            (0.33f, 0.020f, 0.068f, 0.118f, 0.090f),
            (0.36f, 0.020f, 0.070f, 0.105f, 0.080f),
        };

        /// <summary>Tornin huippu ja patsaan paikka (mallin avaruudessa).</summary>
        static readonly Vector3 MsmPatsas = new Vector3(0.028f, 0.772f, 0.07f);

        /// <summary>Kallion pinnan piste kulmassa a (rad) ja murtoindeksissä f (0 = ranta, 5 = laki), ilman kohinaa.</summary>
        static Vector3 MsmRinne(float a, float f)
        {
            int j = Mathf.Min(MsmKallio.Length - 2, (int)f);
            float s = Mathf.Clamp01(f - j);
            var r0 = MsmKallio[j]; var r1 = MsmKallio[j + 1];
            Vector3 p0 = new Vector3(r0.cx + Mathf.Cos(a) * r0.rx, r0.y, r0.cz + Mathf.Sin(a) * r0.rz);
            Vector3 p1 = new Vector3(r1.cx + Mathf.Cos(a) * r1.rx, r1.y, r1.cz + Mathf.Sin(a) * r1.rz);
            return Vector3.Lerp(p0, p1, s);
        }

        static float Rad(float aste) => aste * Mathf.PI / 180f;

        /// <summary>Talojen paikat: (pohjan keskipiste, harjan suunta, ulospäin) kierteisen pääkadun varrella ja muurien sisäpuolella.</summary>
        static List<(Vector3 p, float suunta, Vector3 ulos)> MsmTalot()
        {
            var talot = new List<(Vector3, float, Vector3)>();
            void Lisaa(float aste, float f)
            {
                float a = Rad(aste);
                var pinta = MsmRinne(a, f);
                var ulos = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                // Talo hieman rinteen sisään (ei leijuntaa) ja harja rinteen korkeuskäyrän suuntaan.
                talot.Add((pinta + ulos * 0.008f - Vector3.up * 0.012f, a + Mathf.PI * 0.5f, ulos));
            }
            // Grande Rue: portilta (etelä) kiertäen itään ja pohjoiseen kohti luostaria, 14 taloa kadun ulkoreunalla.
            for (int i = 0; i < 14; i++)
            {
                float t = i / 13f;
                Lisaa(Mathf.Lerp(-104f, 22f, t), Mathf.Lerp(1.0f, 2.55f, t));
            }
            // Kadun sisäreuna (rinteessä ylempänä, porrastettu edellisen väliin), 7 taloa.
            for (int i = 0; i < 7; i++)
            {
                float t = (i + 0.5f) / 7f;
                Lisaa(Mathf.Lerp(-98f, 10f, t), Mathf.Lerp(1.55f, 2.95f, t));
            }
            // Alempi rivi muurien sisäpuolella, 5 taloa.
            for (int i = 0; i < 5; i++) Lisaa(Mathf.Lerp(-82f, -18f, i / 4f), 0.62f);
            return talot;
        }

        static Mesh MontSaintMichelRunko()
        {
            var r = new Rakentaja();
            // Kallio: 6 kerrosta, 14 kulmaa, kohina rannassa. (Vuorovesihiekka on osa "hiekka": ei ääriviivaa.)
            r.Kerroskallio(MsmKallio, 14, 17, 0.14f, EmKivi, EmKiviVaalea);
            // Metsä luoteisrinteellä (todellinen tunnusmerkki: rinne kylän vastapuolella on puiden peitossa).
            for (int i = 0; i < 9; i++)
            {
                float t = i / 8f;
                float a = Rad(Mathf.Lerp(112f, 212f, t));
                var p = MsmRinne(a, 0.9f + 1.3f * ((i * 5) % 3) / 2f) + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * 0.006f - Vector3.up * 0.008f;
                r.Kartio(p, 0.024f, 0.045f, 6, EmPuu);
            }

            // Muurirengas ja tornit etelä- ja itärannalla (lännestä itään eteläkautta); muurit, tornit ja portti yhtenä ääriviivaosana.
            r.AloitaOsa();
            Vector3 Ranta(float aste) { float a = Rad(aste); return new Vector3(Mathf.Cos(a) * 0.39f, 0f, Mathf.Sin(a) * 0.32f); }
            for (float aste = -165f; aste < 30f; aste += 15f)
                r.Seina(Ranta(aste), Ranta(aste + 15f), 0.058f, 0.018f, EmPaperi, EmKiviVaalea);
            foreach (float aste in new[] { -165f, -125f, -55f, -25f, 5f, 30f })
            {
                var p = Ranta(aste);
                r.Pylvas(p, 0.022f, 0.078f, 8, EmPaperi);
            }
            // Porte du Roy etelässä: porttirakennus katolla.
            r.Talo(Ranta(-90f) + new Vector3(0f, 0f, 0.004f), 0f, 0.058f, 0.034f, 0.078f, 0.024f, EmPaperi, EmKatto);
            r.LopetaOsa();
            // Silta etelään (pysyy korkean veden yläpuolella).
            r.Laatikko(new Vector3(0f, 0f, -0.42f), new Vector3(0.028f, 0.016f, 0.16f), EmPaperi, EmPaperi);

            // Kylä: talot kierteisen kadun varrella, seinät vuorotellen paperi ja valo, tummat katot.
            var talot = MsmTalot();
            for (int i = 0; i < talot.Count; i++)
            {
                var (p, suunta, _) = talot[i];
                var seina = (i % 3) == 0 ? EmPaperi : (i % 3) == 1 ? Valo : EmKiviVaalea;
                r.Talo(p, suunta, 0.046f, 0.032f, 0.034f, 0.021f, seina, EmKatto);
            }

            // Luostari laella (y 0,36): kirkko ja sen ympärillä terasseille porrastetut luostarirakennukset. Tunnusmerkki on
            // "rakennusten kruunu": laki on kokonaan rakennettu, ja rakennukset laskeutuvat rinnettä etelään, länteen ja
            // pohjoiseen (La Merveille).
            const float laki = 0.36f;
            r.AloitaOsa();
            // Eteläsiipi (Logis abbatiaux, Belle-Chaise): korkea vaalea seinä etelärinteellä, katto kirkon alapuolella.
            r.Laatikko(new Vector3(0.005f, 0.25f, 0.005f), new Vector3(0.17f, 0.15f, 0.06f), EmPaperi, EmKatto);
            // Länsiterassi (Saut-Gautier) ja länsiportaat.
            r.Laatikko(new Vector3(-0.135f, 0.28f, 0.06f), new Vector3(0.07f, 0.1f, 0.1f), Valo, EmKatto);
            r.Laatikko(new Vector3(-0.1f, 0.33f, 0.012f), new Vector3(0.05f, 0.05f, 0.03f), EmPaperi, EmPaperi);
            // Kirkko: laiva itä–länsi, poikkilaiva, kuori idässä, risteystorni ja torni.
            r.Laatikko(new Vector3(-0.035f, laki, 0.07f), new Vector3(0.16f, 0.09f, 0.058f), EmPaperi, EmPaperi);
            r.Harja(new Vector3(-0.035f, laki + 0.09f, 0.07f), new Vector3(0.16f, 0.04f, 0.058f), EmKatto, EmPaperi);
            r.Laatikko(new Vector3(0.028f, laki, 0.07f), new Vector3(0.048f, 0.09f, 0.12f), EmPaperi, EmPaperi);
            r.HarjaZ(new Vector3(0.028f, laki + 0.09f, 0.07f), new Vector3(0.048f, 0.038f, 0.12f), EmKatto, EmPaperi);
            r.Pylvas(new Vector3(0.08f, laki - 0.02f, 0.07f), 0.038f, 0.12f, 8, EmPaperi);
            r.Kartio(new Vector3(0.08f, laki + 0.1f, 0.07f), 0.041f, 0.038f, 8, EmKatto);

            // La Merveille pohjoisrinteellä: korkea goottilainen seinä, tukipilarit ja ylärivin ikkunat, tumma katto.
            const float mz = 0.19f, msyv = 0.07f;
            r.Laatikko(new Vector3(0.01f, 0.17f, mz), new Vector3(0.18f, 0.24f, msyv), Valo, EmKatto);
            var pohjoinen = Vector3.forward;
            float pinta = mz + msyv * 0.5f;
            for (int i = 0; i < 6; i++)
                r.Laatta(new Vector3(-0.07f + i * 0.032f, 0.31f, pinta), pohjoinen, 0.006f, 0.18f, EmSeepia);
            for (int i = 0; i < 5; i++)
                r.Laatta(new Vector3(-0.054f + i * 0.032f, 0.38f, pinta), pohjoinen, 0.012f, 0.022f, EmMuste);
            r.LopetaOsa();
            // Risteystorni ja torni omina ääriviivaosinaan (luostarin osassa ääriviivan kopio siirtyisi sivuun ja torni näyttäisi
            // kahdelta liioitellussa perspektiivissä).
            r.Laatikko(new Vector3(0.028f, laki + 0.09f, 0.07f), new Vector3(0.04f, 0.075f, 0.04f), Valo, EmKatto);
            r.Kartio(new Vector3(0.028f, laki + 0.165f, 0.07f), 0.023f, MsmPatsas.y - 0.008f - (laki + 0.165f), 8, EmKatto);
            // Eteläsiiven ikkunarivit (näkyvät etelästä, kuten kuuluisa näkymä pengertieltä).
            for (int j = 0; j < 2; j++)
                for (int i = 0; i < 5; i++)
                    r.Laatta(new Vector3(-0.056f + i * 0.028f, 0.3f + j * 0.05f, 0.005f - 0.03f), Vector3.back, 0.009f, 0.016f, EmMuste);
            // Kirkon eteläseinän ikkunat ja muurin portti.
            for (int i = 0; i < 4; i++)
                r.Laatta(new Vector3(-0.095f + i * 0.03f, laki + 0.05f, 0.07f - 0.029f), Vector3.back, 0.008f, 0.032f, EmMuste);
            r.Laatta(Ranta(-90f) + new Vector3(0f, 0.028f, -0.013f), Vector3.back, 0.016f, 0.03f, EmMuste);
            return r.Verkko("MontSaintMichel");
        }

        /// <summary>
        /// Vuorovesihiekka: loiva kartio, joka nousee reunalta (y 0, säde 0,5) rantaan (y 0,009, saaren ellipsi). Nouseva vesi
        /// (tasainen levy) peittää sen siksi vähitellen ulkoreunalta kohti saarta, kuten vuoksi hiekkasärkillä. Osa ilman
        /// ääriviivaa, ettei malli näytä mitalilta.
        /// </summary>
        static Mesh MontSaintMichelHiekka()
        {
            var r = new Rakentaja();
            const int n = 32;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                Vector3 s0 = new Vector3(Mathf.Cos(a0) * 0.385f, MsmHiekkaRanta, Mathf.Sin(a0) * 0.315f), s1 = new Vector3(Mathf.Cos(a1) * 0.385f, MsmHiekkaRanta, Mathf.Sin(a1) * 0.315f);
                Vector3 u0 = new Vector3(Mathf.Cos(a0) * 0.5f, 0f, Mathf.Sin(a0) * 0.5f), u1 = new Vector3(Mathf.Cos(a1) * 0.5f, 0f, Mathf.Sin(a1) * 0.5f);
                r.NelioUlos(s0, u0, u1, s1, Vector3.up, EmHiekka);
            }
            return r.Verkko("MontSaintMichel-hiekka");
        }

        /// <summary>Hiekan korkeus rannassa (reunalla 0).</summary>
        const float MsmHiekkaRanta = 0.009f;

        /// <summary>Vesi: tasainen rengas saaren rannasta hiekan reunaan. Animaatio nostaa sitä hiekan alta (−0,002) rannan yli
        /// (+0,011): vesiraja etenee hiekkakartiolla reunalta saarta kohti.</summary>
        static Mesh MontSaintMichelVesi()
        {
            var r = new Rakentaja();
            r.Rengas(0f, (0f, 0f, 0.39f, 0.32f), (0f, 0f, 0.495f, 0.495f), 32, EmVesi);
            return r.Verkko("MontSaintMichel-vesi");
        }

        /// <summary>Kevätvuoksen vaahtoviiva: kapea vaalea rengas hiekan reunalla (keskisäde 0,4825). Animaatio kutistaa sen
        /// vesirajan mukana kohti rantaa ja nostaa veden mukana.</summary>
        static Mesh MontSaintMichelVaahto()
        {
            var r = new Rakentaja();
            r.Rengas(0.0015f, (0f, 0f, 0.472f, 0.472f), (0f, 0f, 0.493f, 0.493f), 32, EmVaahto);
            return r.Verkko("MontSaintMichel-vaahto");
        }

        /// <summary>Mikael-patsas tornin huipussa (pivot = MsmPatsas): kultainen kaksoispyramidi.</summary>
        static Mesh MontSaintMichelPatsas()
        {
            var r = new Rakentaja();
            r.Timantti(Vector3.zero, 0.009f, 0.016f, EmKulta);
            return r.Verkko("MontSaintMichel-patsas");
        }

        /// <summary>Yövalot: kylän ikkunat rinteen puolella ja kirkon eteläikkunat lämpimänä hehkuna (päivällä piilossa).</summary>
        static Mesh MontSaintMichelValot()
        {
            var r = new Rakentaja();
            foreach (var (p, _, ulos) in MsmTalot())
                r.Laatta(p + ulos * 0.018f + Vector3.up * 0.02f, ulos, 0.012f, 0.012f, EmIkkunavalo);
            for (int i = 0; i < 4; i++)
                r.Laatta(new Vector3(-0.095f + i * 0.03f, 0.41f, 0.07f - 0.029f - 0.0015f), Vector3.back, 0.008f, 0.032f, EmIkkunavalo);
            for (int j = 0; j < 2; j++)
                for (int i = 0; i < 5; i++)
                    r.Laatta(new Vector3(-0.056f + i * 0.028f, 0.3f + j * 0.05f, 0.005f - 0.03f - 0.0015f), Vector3.back, 0.009f, 0.016f, EmIkkunavalo);
            return r.Verkko("MontSaintMichel-valot");
        }

        /// <summary>
        /// Liikkuvat osat (Natiivisepän rajapinta: osat mallin lapsina, lepoasento Pivot). Liikkeen laskee Linssisepän
        /// liikeydin (Ydin/Elava/ErikoisLiike) avaimen ja osan nimen mukaan; alla olevat Liike-, Nopeus-, Laajuus- ja
        /// Vaihtelu-arvot kuvaavat perusliikettä (speksi kohta 6).
        /// </summary>
        static LiikkuvaOsaMaaritys[] MontSaintMichelOsat() => new[]
        {
            new LiikkuvaOsaMaaritys { Nimi = "hiekka", Verkko = MontSaintMichelHiekka, Pivot = Vector3.zero, Liike = Liike.Liuku, Laajuus = 0f },
            new LiikkuvaOsaMaaritys { Nimi = "vesi", Verkko = MontSaintMichelVesi, Pivot = Vector3.zero, Liike = Liike.Nousu,
                Akseli = Vector3.up, Nopeus = 1f / 60f, Laajuus = 0.013f, KayS = 105f, TaukoS = 60f },
            new LiikkuvaOsaMaaritys { Nimi = "vaahto", Verkko = MontSaintMichelVaahto, Pivot = Vector3.zero, Liike = Liike.Aalto,
                Akseli = Vector3.up, Laajuus = 0.16f },
            new LiikkuvaOsaMaaritys { Nimi = "patsas", Verkko = MontSaintMichelPatsas, Pivot = MsmPatsas, Liike = Liike.Valahdys,
                Akseli = Vector3.up },
            new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = MontSaintMichelValot, Pivot = Vector3.zero, Liike = Liike.Valahdys },
        };

        static readonly bool montSaintMichel = Rekisteroi("mont-saint-michel",
            new Erikoismalli { Runko = MontSaintMichelRunko, Osat = MontSaintMichelOsat, Kolmiot0 = 1324, KokoKerroin = 1.5f });
    }
}
