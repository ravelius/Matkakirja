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
            r.Laatikko(new Vector3(0f, 0f, -0.42f), new Vector3(0.028f, 0.024f, 0.16f), EmPaperi, EmPaperi);

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

        // ---- LÄHITASO (omistaja 27.9. klo 08.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: ikkunat, ovet, kallion kerrostuman varjopuoli, räystäät ja kynnykset.
        /// Ominaisuuksina, koska Em-paletti on toisessa tiedostossa (staattisten kenttien alustusjärjestys osittaisluokan
        /// tiedostojen välillä ei ole taattu).</summary>
        static Color MsmLIkkuna => Color.Lerp(EmSeepia, EmMuste, 0.55f);
        static Color MsmLOvi => Color.Lerp(EmKatto, EmMuste, 0.45f);
        static Color MsmLKerros => Color.Lerp(EmKivi, EmSeepia, 0.2f);
        static Color MsmLRaystas => Color.Lerp(EmKatto, EmPaperi, 0.35f);
        static Color MsmLKynnys => Color.Lerp(EmPaperi, EmKiviVaalea, 0.5f);
        /// <summary>Kallion kerrostuman reunus: välirenkaan työntö ulospäin (mallin yksiköissä).</summary>
        const float MsmLReunus = 0.005f;

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (kallio, muurirengas, silta, luostari; risteystorni ja torni omina osinaan) ja osien pivotit kuin rungossa, noin 2,7 ×
        /// kolmiot lähikuvan yksityiskohtiin. Korvaa rungon vain lähellä; hiekka, vesi, vaahto, patsas ja valot pysyvät ennallaan
        /// (talot ja ikkunat rungon paikoilla, joten yövalot osuvat niihin).
        ///   kallio    rungon 14 kulmaa ja kohina säilyvät; väliin kulmat ja neljään alimpaan kerrokseen ulos työnnetty välirengas:
        ///             reunuksen alla jyrkkä tummempi ja yllä loivempi vaalea kaista (kerrostumat)
        ///   muurit    sakarat muurien harjalla, tornit konsolireunuksineen, sakaroineen ja ampumarakoineen, Porte du Roy'n
        ///             kaariportti nostoristikkoineen, sillan kaiteet
        ///   kylä      talojen ikkunat ja ovet rinteen puolella, joka toisella talolla savupiippu
        ///   luostari  eteläsiiven ikkunat kynnyksineen ja tukipilarit; kirkon laivan tukipilarit, ikkunat ja länsijulkisivu;
        ///             kuorin tukipilarit fiaaleineen ja korkeat ikkunat; risteystornin kellotapulin aukot ja kulmafiaalit;
        ///             ruoteinen torninhuippu parvekkeineen; La Merveillen tukipilarit ja kolme ikkunariviä, katolla ruokasalin
        ///             harjakatto ja luostaritarha; länsiterassin kaide ja suurten portaiden askelmat
        /// </summary>
        static Mesh MontSaintMichelLahi()
        {
            var r = new Rakentaja();
            MsmLKallio(r);
            // Metsä luoteisrinteellä kuten rungossa.
            for (int i = 0; i < 9; i++)
            {
                float t = i / 8f;
                float a = Rad(Mathf.Lerp(112f, 212f, t));
                var p = MsmRinne(a, 0.9f + 1.3f * ((i * 5) % 3) / 2f) + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * 0.006f - Vector3.up * 0.008f;
                r.Kartio(p, 0.024f, 0.045f, 6, EmPuu);
            }

            // Muurirengas, tornit ja portti yhtenä ääriviivaosana kuten rungossa; muurien harjalla sakarat.
            r.AloitaOsa();
            Vector3 Ranta(float aste) { float a = Rad(aste); return new Vector3(Mathf.Cos(a) * 0.39f, 0f, Mathf.Sin(a) * 0.32f); }
            for (float aste = -165f; aste < 30f; aste += 15f)
            {
                r.Seina(Ranta(aste), Ranta(aste + 15f), 0.058f, 0.018f, EmPaperi, EmKiviVaalea);
                MsmLSakarat(r, Ranta(aste), Ranta(aste + 15f), 5, 0.058f, 0.018f, EmPaperi, EmKiviVaalea);
            }
            foreach (float aste in new[] { -165f, -125f, -55f, -25f, 5f, 30f })
                MsmLTorni(r, Ranta(aste), 0.022f, 0.078f, new Vector3(Mathf.Cos(Rad(aste)), 0f, Mathf.Sin(Rad(aste))));
            var portti = Ranta(-90f) + new Vector3(0f, 0f, 0.004f);
            r.Talo(portti, 0f, 0.058f, 0.034f, 0.078f, 0.024f, EmPaperi, EmKatto);
            r.LopetaOsa();
            // Porte du Roy: kaariportti ja nostoristikko (rungon oven paikalla).
            var ovi = Ranta(-90f) + new Vector3(0f, 0.028f, -0.013f);
            r.Holvi(ovi, Vector3.back, 0.017f, 0.032f, EmMuste);
            for (int j = -1; j <= 1; j++) r.Laatta(ovi + new Vector3(j * 0.0045f, -0.004f, -0.0008f), Vector3.back, 0.0016f, 0.022f, EmSeepia);
            // Silta etelään kaiteineen (yksi ääriviivaosa kuten rungossa).
            r.AloitaOsa();
            r.Laatikko(new Vector3(0f, 0f, -0.42f), new Vector3(0.028f, 0.024f, 0.16f), EmPaperi, EmPaperi);
            foreach (float x in new[] { -0.0125f, 0.0125f })
                r.Seina(new Vector3(x, 0.024f, -0.5f), new Vector3(x, 0.024f, -0.345f), 0.007f, 0.0022f, EmPaperi, EmKiviVaalea);
            r.LopetaOsa();

            // Kylä: rungon talot samoilla paikoilla, ikkunat ja ovet rinteen puolella, savupiiput.
            var talot = MsmTalot();
            for (int i = 0; i < talot.Count; i++)
            {
                var (p, suunta, ulos) = talot[i];
                var seina = (i % 3) == 0 ? EmPaperi : (i % 3) == 1 ? Valo : EmKiviVaalea;
                MsmLTalo(r, p, suunta, ulos, 0.046f, 0.032f, 0.034f, 0.021f, seina, i);
            }

            // Luostari laella: rungon rakennusmassat yhtenä ääriviivaosana; katoille räystäät, La Merveillen katolle ruokasalin
            // harjakatto ja luostaritarha.
            const float laki = 0.36f;
            const float mz = 0.19f, msyv = 0.07f;
            r.AloitaOsa();
            r.Laatikko(new Vector3(0.005f, 0.25f, 0.005f), new Vector3(0.17f, 0.15f, 0.06f), EmPaperi, EmKatto);
            r.Laatikko(new Vector3(-0.135f, 0.28f, 0.06f), new Vector3(0.07f, 0.1f, 0.1f), Valo, EmKatto);
            r.Laatikko(new Vector3(-0.1f, 0.33f, 0.012f), new Vector3(0.05f, 0.05f, 0.03f), EmPaperi, EmPaperi);
            r.Laatikko(new Vector3(-0.035f, laki, 0.07f), new Vector3(0.16f, 0.09f, 0.058f), EmPaperi, EmPaperi);
            r.HarjaRaystas(new Vector3(-0.035f, laki + 0.09f, 0.07f), new Vector3(0.16f, 0.04f, 0.058f), true, EmKatto, MsmLRaystas, EmPaperi);
            r.Laatikko(new Vector3(0.028f, laki, 0.07f), new Vector3(0.048f, 0.09f, 0.12f), EmPaperi, EmPaperi);
            r.HarjaRaystas(new Vector3(0.028f, laki + 0.09f, 0.07f), new Vector3(0.048f, 0.038f, 0.12f), false, EmKatto, MsmLRaystas, EmPaperi);
            var kuori = new Vector3(0.08f, laki - 0.02f, 0.07f);
            r.Vaippa(kuori, 0.038f, 0.038f, 0.12f, 8, EmPaperi);
            r.KartioRaystas(kuori + Vector3.up * 0.12f, 0.041f, 0.038f, 8, EmKatto, MsmLRaystas);
            r.Laatikko(new Vector3(0.01f, 0.17f, mz), new Vector3(0.18f, 0.24f, msyv), Valo, EmKatto);
            r.HarjaRaystas(new Vector3(0.055f, 0.41f, mz), new Vector3(0.09f, 0.016f, msyv), true, EmKatto, MsmLRaystas, Valo);
            r.NelioUlos(new Vector3(-0.068f, 0.4106f, mz - 0.022f), new Vector3(-0.012f, 0.4106f, mz - 0.022f), new Vector3(-0.012f, 0.4106f, mz + 0.022f),
                new Vector3(-0.068f, 0.4106f, mz + 0.022f), Vector3.up, Color.Lerp(EmPuu, EmKatto, 0.3f));
            MsmLKehys(r, -0.068f, -0.012f, mz - 0.022f, mz + 0.022f, 0.4112f, 0.0022f, MsmLIkkuna);
            r.LopetaOsa();

            // Eteläsiipi: rungon ikkunarivit kynnyksineen ja tukipilarit ikkunasarakkeiden välissä.
            float ze = 0.005f - 0.03f;
            for (int j = 0; j < 2; j++)
                for (int i = 0; i < 5; i++)
                    MsmLIkkunaKynnys(r, new Vector3(-0.056f + i * 0.028f, 0.3f + j * 0.05f, ze), Vector3.back, 0.009f, 0.016f, EmMuste);
            for (int i = 0; i < 6; i++)
                MsmLTukipilari(r, new Vector3(-0.07f + i * 0.028f, 0.25f, ze), Vector3.back, 0.0055f, 0.005f, 0.14f, EmPaperi);
            // Kirkon laiva: tukipilarit ja ikkunat molemmilla sivuilla (etelässä rungon ikkunat), länsijulkisivun ovi ja ikkunat.
            for (int s = 0; s < 2; s++)
            {
                var ulos = s == 0 ? Vector3.back : Vector3.forward;
                float z = s == 0 ? 0.07f - 0.029f : 0.07f + 0.029f;
                for (int i = 0; i < 4; i++)
                {
                    r.Laatta(new Vector3(-0.095f + i * 0.03f, laki + 0.05f, z), ulos, 0.008f, 0.032f, EmMuste);
                    MsmLTukipilari(r, new Vector3(-0.11f + i * 0.03f, laki, z), ulos, 0.006f, 0.006f, 0.084f, EmPaperi);
                }
            }
            r.Laatta(new Vector3(-0.115f, 0.395f, 0.07f), Vector3.left, 0.012f, 0.026f, MsmLOvi);
            r.Laatta(new Vector3(-0.115f, 0.428f, 0.07f), Vector3.left, 0.008f, 0.018f, EmMuste);
            r.Laatta(new Vector3(-0.115f, 0.466f, 0.07f), Vector3.left, 0.008f, 0.008f, EmMuste);
            // Poikkilaivan päätyjen ikkunat.
            r.Laatta(new Vector3(0.028f, laki + 0.05f, 0.01f), Vector3.back, 0.012f, 0.04f, EmMuste);
            r.Laatta(new Vector3(0.028f, laki + 0.05f, 0.13f), Vector3.forward, 0.012f, 0.04f, EmMuste);
            // Kuori: tukipilarit apsiksen kulmissa fiaaleineen ja korkeat ikkunat niiden välissä (länsipuoli on poikkilaivan sisällä).
            for (int k = -2; k <= 2; k++)
            {
                float a = k * Mathf.PI / 4f;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                MsmLTukipilari(r, kuori + d * 0.037f, d, 0.007f, 0.012f, 0.1f, EmPaperi);
                r.Kartio(kuori + d * 0.043f + Vector3.up * 0.088f, 0.0042f, 0.022f, 4, EmPaperi);
                if (k < 2)
                {
                    float af = a + Mathf.PI / 8f;
                    var df = new Vector3(Mathf.Cos(af), 0f, Mathf.Sin(af));
                    r.Laatta(kuori + df * 0.0352f + Vector3.up * 0.068f, df, 0.011f, 0.05f, EmMuste);
                }
            }
            // La Merveille: pohjoisseinän tukipilarit (rungossa laattoina) ja kolme ikkunariviä: kellari, Ritarisali ja ruokasali,
            // ylinnä luostarin kerros (rungon ikkunat).
            float pinta = mz + msyv * 0.5f;
            for (int i = 0; i < 6; i++)
            {
                MsmLTukipilari(r, new Vector3(-0.07f + i * 0.032f, 0.17f, pinta), Vector3.forward, 0.007f, 0.008f, 0.23f, Valo);
                // Varjojuova pilarin itäpuolella (valo luoteesta): rungon tumma pystyjuova säilyy kaukaa katsottuna.
                r.Laatta(new Vector3(-0.07f + i * 0.032f + 0.0068f, 0.31f, pinta), Vector3.forward, 0.0062f, 0.18f, EmSeepia);
            }
            for (int i = 0; i < 5; i++)
            {
                float x = -0.054f + i * 0.032f;
                r.Laatta(new Vector3(x, 0.38f, pinta), Vector3.forward, 0.012f, 0.022f, EmMuste);
                r.Laatta(new Vector3(x, 0.322f, pinta), Vector3.forward, 0.01f, 0.032f, EmMuste);
                r.Laatta(new Vector3(x, 0.262f, pinta), Vector3.forward, 0.007f, 0.012f, MsmLIkkuna);
            }
            // Länsiterassin kaide ja suurten portaiden askelmat.
            r.Seina(new Vector3(-0.168f, 0.38f, 0.012f), new Vector3(-0.168f, 0.38f, 0.108f), 0.008f, 0.003f, Valo, EmKiviVaalea);
            for (int i = 0; i < 4; i++)
            {
                float z = 0.0f + i * 0.0075f;
                r.NelioUlos(new Vector3(-0.124f, 0.3806f, z - 0.0007f), new Vector3(-0.076f, 0.3806f, z - 0.0007f), new Vector3(-0.076f, 0.3806f, z + 0.0007f),
                    new Vector3(-0.124f, 0.3806f, z + 0.0007f), Vector3.up, MsmLKerros);
            }

            // Risteystorni (oma osa kuten rungossa): kellotapulin kaksoisaukot joka sivulla ja kulmafiaalit.
            var torni = new Vector3(0.028f, laki + 0.09f, 0.07f);
            r.Laatikko(torni, new Vector3(0.04f, 0.075f, 0.04f), Valo, EmKatto);
            foreach (var d in new[] { Vector3.forward, Vector3.back, Vector3.left, Vector3.right })
            {
                var sivu = Vector3.Cross(Vector3.up, d);
                for (int j = -1; j <= 1; j += 2)
                    r.Laatta(torni + d * 0.02f + sivu * (0.0085f * j) + Vector3.up * 0.052f, d, 0.0062f, 0.024f, EmMuste);
            }
            for (int j = 0; j < 4; j++)
            {
                float sx = j % 2 == 0 ? -1f : 1f, sz = j < 2 ? -1f : 1f;
                r.Kartio(torni + new Vector3(sx * 0.016f, 0.075f, sz * 0.016f), 0.0045f, 0.022f, 4, EmPaperi);
            }
            // Torninhuippu (oma osa kuten rungossa): ruoteinen huippu ja parveke; Mikael-patsas on liikkuva osa.
            MsmLHuippu(r, new Vector3(0.028f, laki + 0.165f, 0.07f), 0.023f, MsmPatsas.y - 0.008f - (laki + 0.165f));
            return r.Verkko("MontSaintMichel-lahi");
        }

        /// <summary>
        /// Lähitason kallio: rungon kerroskallion renkaat ja 14 kulmaa samalla kohinalla (siemen 17, vaihtelu 0,14), joten siluetti
        /// säilyy. Jokaisen kulman väliin kulma rungon sivulle pienellä kohinalla, ja neljään alimpaan kerrokseen välirengas, jota
        /// työnnetään ulos (kerrostuman reunus): reunuksen alla jyrkkä, tummempi kaista ja sen yllä loivempi, vaaleampi. Reunuksen
        /// korkeus ja ulkonema vaihtelevat kulmittain, joten kerrostumat eivät näytä korkeuskäyriltä.
        /// 9 kaistaa × 28 kulmaa ja laki: 532 kolmiota (rungossa 154). Yksi ääriviivaosa kuten rungossa.
        /// </summary>
        static void MsmLKallio(Rakentaja r)
        {
            var renkaat = MsmKallio;
            const int k = 14;
            const float vaihtelu = 0.14f;
            var sat = new System.Random(17);
            var kohina = new float[k];
            for (int i = 0; i < k; i++) kohina[i] = 1f - vaihtelu * 0.5f + vaihtelu * (float)sat.NextDouble();
            int nR = renkaat.Length;
            var p = new Vector3[nR, k];
            for (int j = 0; j < nR; j++)
                for (int i = 0; i < k; i++)
                {
                    float a = i * Mathf.PI * 2f / k;
                    float s = Mathf.Lerp(kohina[i], 1f, 0.5f * j / Mathf.Max(1, nR - 1));
                    var rr = renkaat[j];
                    p[j, i] = new Vector3(rr.cx + Mathf.Cos(a) * rr.rx * s, rr.y, rr.cz + Mathf.Sin(a) * rr.rz * s);
                }
            Vector3 Keski(int j) => new Vector3(renkaat[j].cx, renkaat[j].y, renkaat[j].cz);
            var sat2 = new System.Random(1873);
            var kulmaKohina = new float[2 * k];
            for (int i = 1; i < 2 * k; i += 2) kulmaKohina[i] = ((float)sat2.NextDouble() - 0.5f) * 0.008f;
            // Kerrostuman reunus ei ole korkeuskäyrä: välirenkaan korkeus (osuus kerroksesta) ja työntö vaihtelevat kulmittain
            // (naapurien keskiarvolla pehmennetty kohina), ja kukin kerros saa oman vaihtelunsa.
            var reunusF = new float[4, 2 * k]; var reunusT = new float[4, 2 * k];
            for (int j = 0; j < 4; j++)
            {
                var raaka = new float[2 * k]; var raaka2 = new float[2 * k];
                for (int i = 0; i < 2 * k; i++) { raaka[i] = (float)sat2.NextDouble(); raaka2[i] = (float)sat2.NextDouble(); }
                for (int i = 0; i < 2 * k; i++)
                {
                    int e = (i + 2 * k - 1) % (2 * k), n = (i + 1) % (2 * k);
                    reunusF[j, i] = 0.5f + 0.36f * ((raaka[e] + 2f * raaka[i] + raaka[n]) * 0.25f - 0.5f);
                    reunusT[j, i] = MsmLReunus * (0.3f + 1.4f * (raaka2[e] + 2f * raaka2[i] + raaka2[n]) * 0.25f);
                }
            }
            var tasot = new List<Vector3[]>();
            var keskit = new List<Vector3>();
            var valirengas = new List<bool>();
            for (int j = 0; j < nR; j++)
                for (int puoli = 0; puoli < 2; puoli++)
                {
                    if (puoli == 1 && j > 3) break;
                    var c = puoli == 0 ? Keski(j) : Vector3.Lerp(Keski(j), Keski(j + 1), 0.5f);
                    var taso = new Vector3[2 * k];
                    for (int i = 0; i < 2 * k; i++)
                    {
                        int i0 = i / 2, i1 = (i0 + 1) % k;
                        float g = (i % 2) * 0.5f;
                        var q = Vector3.Lerp(p[j, i0], p[j, i1], g);
                        if (puoli == 1) q = Vector3.Lerp(q, Vector3.Lerp(p[j + 1, i0], p[j + 1, i1], g), reunusF[j, i]);
                        var ulos = q - c; ulos.y = 0f;
                        taso[i] = q + ulos.normalized * (kulmaKohina[i] * (j == 0 && puoli == 0 ? 0.5f : 1f) + (puoli == 1 ? reunusT[j, i] : 0f));
                    }
                    tasot.Add(taso); keskit.Add(c); valirengas.Add(puoli == 1);
                }
            r.AloitaOsa();
            for (int j = 0; j + 1 < tasot.Count; j++)
            {
                var c = (keskit[j] + keskit[j + 1]) * 0.5f;
                // Välirenkaaseen päättyvä kaista on reunuksen alla (jyrkkä, tumma); siitä alkava sen yllä (loiva, vaalea).
                var vari = valirengas[j + 1] ? MsmLKerros : EmKivi;
                for (int i = 0; i < 2 * k; i++)
                {
                    int q = (i + 1) % (2 * k);
                    r.NelioKeskelta(tasot[j][i], tasot[j + 1][i], tasot[j + 1][q], tasot[j][q], c, vari);
                }
            }
            var ylin = tasot[tasot.Count - 1];
            var lakiKeski = Keski(nR - 1);
            for (int i = 0; i < 2 * k; i++) r.KolmioUlos(lakiKeski, ylin[i], ylin[(i + 1) % (2 * k)], Vector3.up, EmKiviVaalea);
            r.LopetaOsa();
        }

        /// <summary>Muurin harjan sakarat: n kappaletta muurin ulkoreunalla janalla a → b (muurin keskilinja, harja korkeudella y,
        /// paksuus kuten Seina); ulko-, sisä- ja yläpinta (6 kolmiota kappaleelta).</summary>
        static void MsmLSakarat(Rakentaja r, Vector3 a, Vector3 b, int n, float y, float paksuus, Color sivu, Color kansi)
        {
            var t = b - a; t.y = 0f;
            var ulos = Vector3.Cross(Vector3.up, t).normalized;
            var td = t.normalized * 0.0043f;
            Vector3 kork = Vector3.up * 0.009f;
            for (int j = 0; j < n; j++)
            {
                var c = Vector3.Lerp(a, b, (j + 0.5f) / n) + Vector3.up * y;
                Vector3 o = c + ulos * (paksuus * 0.5f), s = c + ulos * (paksuus * 0.5f - 0.0065f);
                r.NelioUlos(o - td, o + td, o + td + kork, o - td + kork, ulos, sivu);
                r.NelioUlos(s - td, s + td, s + td + kork, s - td + kork, -ulos, sivu);
                r.NelioUlos(s - td + kork, s + td + kork, o + td + kork, o - td + kork, Vector3.up, kansi);
            }
        }

        /// <summary>Muurin torni (rungossa Pylvas(p, sade, kork, 8)): runko, leveämpi konsolireunus ylhäällä, tasakatto, neljä
        /// sakaraa reunalla ja kaksi ampumarakoa ulospäin. 68 kolmiota.</summary>
        static void MsmLTorni(Rakentaja r, Vector3 p, float sade, float kork, Vector3 ulos)
        {
            float yr = kork - 0.015f, sr = sade * 1.13f;
            r.Vaippa(p, sade, sade, yr, 8, EmPaperi);
            r.Vaippa(p + Vector3.up * yr, sr, sr, kork - yr, 8, EmPaperi);
            Vector3 K(int i, float rr, float yy) { float a = i * Mathf.PI * 2f / 8f; return p + new Vector3(Mathf.Cos(a) * rr, yy, Mathf.Sin(a) * rr); }
            for (int i = 0; i < 8; i++) r.KolmioUlos(p + Vector3.up * kork, K(i, sr, kork), K(i + 1, sr, kork), Vector3.up, EmPaperi);
            var ks = Vector3.up * 0.009f;
            for (int i = 0; i < 8; i += 2)
            {
                Vector3 o0 = Vector3.Lerp(K(i, sr, kork), K(i + 1, sr, kork), 0.2f), o1 = Vector3.Lerp(K(i, sr, kork), K(i + 1, sr, kork), 0.8f);
                Vector3 s0 = Vector3.Lerp(K(i, sr - 0.0065f, kork), K(i + 1, sr - 0.0065f, kork), 0.2f), s1 = Vector3.Lerp(K(i, sr - 0.0065f, kork), K(i + 1, sr - 0.0065f, kork), 0.8f);
                var n = (o0 + o1) * 0.5f - p; n.y = 0f;
                r.NelioUlos(o0, o1, o1 + ks, o0 + ks, n, EmPaperi);
                r.NelioUlos(s0, s1, s1 + ks, s0 + ks, -n, EmPaperi);
                r.NelioUlos(s0 + ks, s1 + ks, o1 + ks, o0 + ks, Vector3.up, EmPaperi);
            }
            var u = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var sivu = Vector3.Cross(Vector3.up, u);
            for (int j = -1; j <= 1; j += 2)
            {
                var d = (u + sivu * (0.55f * j)).normalized;
                r.Laatta(p + d * sade + Vector3.up * (kork * 0.42f), d, 0.0028f, 0.014f, MsmLIkkuna);
            }
        }

        /// <summary>Lähitason talo: rungon talo samassa paikassa ja koossa, rinteen puoleisessa pitkässä seinässä kaksi yläkerran
        /// ikkunaa, ovi ja alakerran ikkuna (järjestys vaihtelee), joka toisella talolla savupiippu harjalla. 22 tai 32 kolmiota.</summary>
        static void MsmLTalo(Rakentaja r, Vector3 p, float suunta, Vector3 ulos, float leveys, float syvyys, float h, float harja,
            Color seina, int nro)
        {
            r.Talo(p, suunta, leveys, syvyys, h, harja, seina, EmKatto);
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var etu = p + n * (syvyys * 0.5f);
            float puoli = nro % 2 == 0 ? 1f : -1f;
            r.Laatta(etu + ex * (leveys * 0.24f) + Vector3.up * (h * 0.72f), n, 0.0065f, 0.0085f, MsmLIkkuna);
            r.Laatta(etu - ex * (leveys * 0.24f) + Vector3.up * (h * 0.72f), n, 0.0065f, 0.0085f, MsmLIkkuna);
            r.Laatta(etu + ex * (leveys * 0.22f * puoli) + Vector3.up * (h * 0.26f), n, 0.0075f, 0.0145f, MsmLOvi);
            r.Laatta(etu - ex * (leveys * 0.22f * puoli) + Vector3.up * (h * 0.32f), n, 0.0065f, 0.008f, MsmLIkkuna);
            if (nro % 2 == 0)
                r.Laatikko(p + ex * (leveys * 0.3f * puoli) + Vector3.up * (h + harja * 0.35f), new Vector3(0.0065f, harja * 0.65f + 0.009f, 0.0065f),
                    EmKiviVaalea, MsmLIkkuna);
        }

        /// <summary>Tukipilari seinän pintaan: jalka p seinän pinnassa, ulospäin, leveys, ulkonema ja korkeus; etupinta, sivut ja
        /// viisto vesikatto ylhäällä (8 kolmiota). Oma pieni osa (ei ääriviivaa).</summary>
        static void MsmLTukipilari(Rakentaja r, Vector3 p, Vector3 ulos, float lev, float ulk, float kork, Color vari)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n) * (lev * 0.5f);
            Vector3 e = n * ulk, y = Vector3.up * kork, yv = Vector3.up * (kork - ulk * 1.3f);
            r.AloitaOsa();
            r.NelioUlos(p - t + e, p + t + e, p + t + e + yv, p - t + e + yv, n, vari);
            r.NelioUlos(p + t, p + t + e, p + t + e + yv, p + t + y, t, vari);
            r.NelioUlos(p - t, p - t + e, p - t + e + yv, p - t + y, -t, vari);
            r.NelioUlos(p - t + e + yv, p + t + e + yv, p + t + y, p - t + y, n + Vector3.up, vari);
            r.LopetaOsa();
        }

        /// <summary>Ikkuna ja sen alla vaalea kynnys (ulkoneva vaakapinta, joka valaistuu ylhäältä): 4 kolmiota.</summary>
        static void MsmLIkkunaKynnys(Rakentaja r, Vector3 p, Vector3 ulos, float lev, float kork, Color vari)
        {
            r.Laatta(p, ulos, lev, kork, vari);
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n) * (lev * 0.65f);
            var q = p - Vector3.up * (kork * 0.5f + 0.0008f);
            r.NelioUlos(q - t, q + t, q + t + n * 0.0035f, q - t + n * 0.0035f, Vector3.up, MsmLKynnys);
        }

        /// <summary>Vaakasuoran suorakulmion reunakehys (luostaritarhan pylväikön varjo): neljä kapeaa nauhaa korkeudella y.</summary>
        static void MsmLKehys(Rakentaja r, float x0, float x1, float z0, float z1, float y, float lev, Color vari)
        {
            r.NelioUlos(new Vector3(x0, y, z0), new Vector3(x1, y, z0), new Vector3(x1, y, z0 + lev), new Vector3(x0, y, z0 + lev), Vector3.up, vari);
            r.NelioUlos(new Vector3(x0, y, z1 - lev), new Vector3(x1, y, z1 - lev), new Vector3(x1, y, z1), new Vector3(x0, y, z1), Vector3.up, vari);
            r.NelioUlos(new Vector3(x0, y, z0 + lev), new Vector3(x0 + lev, y, z0 + lev), new Vector3(x0 + lev, y, z1 - lev), new Vector3(x0, y, z1 - lev), Vector3.up, vari);
            r.NelioUlos(new Vector3(x1 - lev, y, z0 + lev), new Vector3(x1, y, z0 + lev), new Vector3(x1, y, z1 - lev), new Vector3(x1 - lev, y, z1 - lev), Vector3.up, vari);
        }

        /// <summary>Ruoteinen torninhuippu (rungossa Kartio(p, sade, kork, 8)): kahdeksan ruodetta rungon kulmissa ja niiden välissä
        /// kapeampi uurre (16 tahkoa, jotka erottuvat valossa viivoina) sekä kapea parveke kolmanneksen korkeudella. Oma osa.</summary>
        static void MsmLHuippu(Rakentaja r, Vector3 p, float sade, float kork)
        {
            r.AloitaOsa();
            Vector3 k = p + Vector3.up * kork, keski = p + Vector3.up * (kork * 0.3f);
            for (int i = 0; i < 16; i++)
            {
                float a0 = i * Mathf.PI / 8f, a1 = (i + 1) * Mathf.PI / 8f;
                float r0 = i % 2 == 0 ? sade : sade * 0.78f, r1 = i % 2 == 0 ? sade * 0.78f : sade;
                r.KolmioKeskelta(p + new Vector3(Mathf.Cos(a0) * r0, 0f, Mathf.Sin(a0) * r0), p + new Vector3(Mathf.Cos(a1) * r1, 0f, Mathf.Sin(a1) * r1),
                    k, keski, EmKatto);
            }
            float yp = kork * 0.28f, rp = sade * 0.72f + 0.0035f;
            r.Vaippa(p + Vector3.up * yp, rp, rp, 0.006f, 8, EmPaperi);
            r.LopetaOsa();
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

        /// <summary>Maatason osien nosto (laite 27.9.: liioiteltu rannikon maasto peitti hiekkalevyn reunaa): hiekka, vesi ja vaahto
        /// 0,006 ylempänä; silta on sen vuoksi 0,024 korkea, jotta se pysyy korkean veden yläpuolella.</summary>
        static readonly Vector3 MsmMaataso = new Vector3(0f, 0.006f, 0f);

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
            new LiikkuvaOsaMaaritys { Nimi = "hiekka", Verkko = MontSaintMichelHiekka, Pivot = MsmMaataso, Liike = Liike.Liuku, Laajuus = 0f },
            new LiikkuvaOsaMaaritys { Nimi = "vesi", Verkko = MontSaintMichelVesi, Pivot = MsmMaataso, Liike = Liike.Nousu,
                Akseli = Vector3.up, Nopeus = 1f / 60f, Laajuus = 0.013f, KayS = 105f, TaukoS = 60f },
            new LiikkuvaOsaMaaritys { Nimi = "vaahto", Verkko = MontSaintMichelVaahto, Pivot = MsmMaataso, Liike = Liike.Aalto,
                Akseli = Vector3.up, Laajuus = 0.16f },
            new LiikkuvaOsaMaaritys { Nimi = "patsas", Verkko = MontSaintMichelPatsas, Pivot = MsmPatsas, Liike = Liike.Valahdys,
                Akseli = Vector3.up },
            new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = MontSaintMichelValot, Pivot = Vector3.zero, Liike = Liike.Valahdys },
        };

        static readonly bool montSaintMichel = Rekisteroi("mont-saint-michel",
            new Erikoismalli { Runko = MontSaintMichelRunko, Osat = MontSaintMichelOsat, Lahi = MontSaintMichelLahi, Kolmiot0 = 1324, KokoKerroin = 1.5f });
    }
}
