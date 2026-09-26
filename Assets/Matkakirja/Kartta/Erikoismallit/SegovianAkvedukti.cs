using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI SEGOVIAN AKVEDUKTI (speksi docs/raportit/erikoismallit/segovian-akvedukti.md, omistajan jono 27.9. klo 01.4x).
    /// Tunnistus sekunnissa: pitkä kaaririvi, jonka keskellä (Plaza del Azoguejo, 28,5 m) kaksi kaarikerrosta päällekkäin ja
    /// päissä maan noustessa yksi kerros; yläreunassa vesikouru (specus) ja keskellä kapea syvennys (Neitsyt Marian patsas).
    /// Tyylitelty: 959 m:n ja 167 kaaren sijaan 1,0 ≈ 400 m ja 20 kaarta (10 kaksikerroksista keskellä), pystyliioittelu 3,
    /// jotta kaaret erottuvat 60 pt:ssä; kulkee itä–länsi (tyylitelty, Kaari-apuri). Graniitti paperi → seepia, aukot
    /// varjossa, ei laastia eikä saumoja (liian pieniä). Paksuus liioiteltu (0,034), jotta rivi erottuu myös ylhäältä.
    /// Liikkuvat osat:
    ///   vesi    kimallus liukuu vesikourua pitkin vuorilta kaupunkiin (perusliike, käynti ja tauko)
    ///   kivi    paholaisen viimeinen kivi (harvinainen ja napautus): nousee aukiolta kaaren yli kohti kourua, jää
    ///           aamunkoitossa vajaaksi ja putoaa takaisin (legenda: paholainen hävisi yhden kiven takia)
    ///   aamu    kultainen aamunkoiton kajo kaarissa (tapahtuman lopussa)
    ///   valot   yöllä kaaret valaistaan alhaalta
    /// </summary>
    public sealed partial class Symbolimallit
    {
        const int SaKaaria = 20;
        const float SaVali = 0.05f, SaPilari = 0.013f, SaPaksuus = 0.034f, SaYla = 0.17f, SaKouru = 0.018f, SaVyo = 0.105f;
        static readonly Color SaGraniitti = Hex(0xcdbb98), SaGraniittiVarjo = Hex(0xb4a07e), SaHolvi = Hex(0x8f7a5a), SaMaa = Hex(0xd6c49c);

        /// <summary>Maan korkeus x:ssä: keskellä aukio (0), päissä rinne nousee kourun alle (kaaret madaltuvat).</summary>
        static float SaMaanKorkeus(float x)
        {
            float a = Mathf.Abs(x);
            return a < 0.24f ? 0f : Mathf.Min(SaYla - 0.025f, (a - 0.24f) / 0.26f * (SaYla - 0.025f));
        }

        static Mesh SegovianAkveduktiRunko()
        {
            var r = new Rakentaja();
            float z0 = -SaPaksuus * 0.5f, z1 = SaPaksuus * 0.5f, x0 = -SaKaaria * SaVali * 0.5f;
            r.AloitaOsa();
            // Pilarit maasta kouruun (keskellä kaksikerroksisen osan vyö erottaa kerrokset).
            for (int i = 0; i <= SaKaaria; i++)
            {
                float x = x0 + i * SaVali, g = SaMaanKorkeus(x);
                r.Laatikko(new Vector3(x, g, 0f), new Vector3(SaPilari, SaYla - g, SaPaksuus * 1.15f), SaGraniitti, SaGraniitti);
            }
            // Kaaret: kaksikerroksiset (alempi korkea, ylempi matala) siellä, missä maata on alle 0,04, muuten yksi kerros.
            for (int i = 0; i < SaKaaria; i++)
            {
                float cx = x0 + (i + 0.5f) * SaVali, g = Mathf.Max(SaMaanKorkeus(cx - SaVali * 0.5f), SaMaanKorkeus(cx + SaVali * 0.5f));
                float lev = SaVali - SaPilari;
                if (g < 0.04f)
                {
                    r.Kaari(cx, lev, SaVyo - 0.03f - lev * 0.5f, lev * 0.5f, SaVyo, z0, z1, 3, SaGraniitti, SaHolvi);
                    r.Kaari(cx, lev, SaYla - 0.02f - lev * 0.5f, lev * 0.5f, SaYla, z0, z1, 3, SaGraniitti, SaHolvi);
                }
                else if (SaYla - g > 0.035f)
                {
                    float ys = g + (SaYla - g) * 0.55f;
                    r.Kaari(cx, lev, ys, lev * 0.5f, SaYla, z0, z1, 3, SaGraniitti, SaHolvi);
                }
                else r.Laatikko(new Vector3(cx, g, 0f), new Vector3(SaVali, SaYla - g, SaPaksuus), SaGraniittiVarjo, SaGraniitti);
            }
            // Vyö kerrosten välissä (kaksikerroksinen osa) ja vesikouru koko matkalla.
            r.Laatikko(new Vector3(0f, SaVyo - 0.006f, 0f), new Vector3(0.52f, 0.008f, SaPaksuus * 1.3f), SaGraniitti, SaGraniitti);
            r.Laatikko(new Vector3(0f, SaYla, 0f), new Vector3(SaKaaria * SaVali + SaPilari, SaKouru, SaPaksuus * 1.2f), SaGraniitti, SaGraniitti);
            r.LopetaOsa();
            // Kourun uoma (tumma kaista kourun päällä, vesi liukuu sen päällä) ja syvennys patsaineen keskellä molemmin puolin.
            r.NelioUlos(new Vector3(-0.5f, SaYla + SaKouru + 0.001f, -0.005f), new Vector3(0.5f, SaYla + SaKouru + 0.001f, -0.005f),
                new Vector3(0.5f, SaYla + SaKouru + 0.001f, 0.005f), new Vector3(-0.5f, SaYla + SaKouru + 0.001f, 0.005f), Vector3.up, SaHolvi);
            foreach (float s in new[] { -1f, 1f })
            {
                r.Laatta(new Vector3(0f, SaYla - 0.012f, s * SaPaksuus * 0.6f), new Vector3(0f, 0f, s), 0.016f, 0.03f, SaHolvi);
                r.Timantti(new Vector3(0f, SaYla - 0.014f, s * SaPaksuus * 0.62f), 0.004f, 0.01f, EmKulta, 4);
            }
            // Maan rinteet päissä kaaririvin levyisinä (kaaret nousevat kaupunkiin ja vuorille päin); aukio keskellä on kartta.
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(s * 0.24f, 0.001f, 0f), b = new Vector3(s * 0.52f, SaYla - 0.02f, 0f);
                var n = new Vector3(0f, 0f, SaPaksuus * 0.6f);
                r.NelioUlos(a - n, b - n, b + n, a + n, Vector3.up, SaMaa);
            }
            return r.Verkko("SegovianAkvedukti");
        }

        /// <summary>Kimallus: vaalea vesiviiru (pivot keskellä), liukuu kourua pitkin.</summary>
        static Mesh SegovianAkveduktiVesi()
        {
            var r = new Rakentaja();
            r.NelioUlos(new Vector3(-0.05f, 0f, -0.0045f), new Vector3(0.05f, 0f, -0.0045f), new Vector3(0.05f, 0f, 0.0045f), new Vector3(-0.05f, 0f, 0.0045f),
                Vector3.up, EmVesi);
            r.NelioUlos(new Vector3(-0.012f, 0.0005f, -0.003f), new Vector3(0.012f, 0.0005f, -0.003f), new Vector3(0.012f, 0.0005f, 0.003f),
                new Vector3(-0.012f, 0.0005f, 0.003f), Vector3.up, EmVaahto);
            return r.Verkko("SegovianAkvedukti-vesi");
        }

        /// <summary>Paholaisen kivi: tumma graniittilohko (pivot keskellä).</summary>
        static Mesh SegovianAkveduktiKivi()
        {
            var r = new Rakentaja();
            r.Laatikko(new Vector3(0f, -0.014f, 0f), new Vector3(0.034f, 0.028f, 0.03f), SaGraniittiVarjo, SaGraniitti);
            return r.Verkko("SegovianAkvedukti-kivi");
        }

        /// <summary>Aamunkoitto: kultainen kajo kahdeksan keskimmäisen alakaaren aukoissa (eteläpuoli, aukiolle päin).</summary>
        static Mesh SegovianAkveduktiAamu()
        {
            var r = new Rakentaja();
            for (int i = -4; i < 4; i++)
                r.Laatta(new Vector3((i + 0.5f) * SaVali, SaVyo * 0.4f, 0f), Vector3.back, SaVali - SaPilari - 0.004f, SaVyo * 0.55f, EmKulta);
            return r.Verkko("SegovianAkvedukti-aamu");
        }

        /// <summary>Yövalot: lämmin hehku alakaarien aukoissa molemmin puolin (valaistus alhaalta).</summary>
        static Mesh SegovianAkveduktiValot()
        {
            var r = new Rakentaja();
            float x0 = -SaKaaria * SaVali * 0.5f;
            for (int i = 0; i < SaKaaria; i++)
            {
                float cx = x0 + (i + 0.5f) * SaVali, g = SaMaanKorkeus(cx);
                if (SaYla - g < 0.05f) continue;
                foreach (float s in new[] { -1f, 1f })
                    r.Laatta(new Vector3(cx, g + (SaYla - g) * 0.3f, s * 0.001f), new Vector3(0f, 0f, s), SaVali - SaPilari - 0.006f, (SaYla - g) * 0.4f, EmIkkunavalo);
            }
            return r.Verkko("SegovianAkvedukti-valot");
        }

        /// <summary>Kiven lähtöpaikka aukiolla (etelän puolella) ja kohde kourun vieressä keskellä.</summary>
        static readonly Vector3 SaKiviAlku = new Vector3(0.06f, 0.03f, -0.12f);

        static LiikkuvaOsaMaaritys[] SegovianAkveduktiOsat() => new[]
        {
            new LiikkuvaOsaMaaritys { Nimi = "vesi", Verkko = SegovianAkveduktiVesi, Pivot = new Vector3(0f, SaYla + SaKouru + 0.002f, 0f), Liike = Liike.Liuku,
                Akseli = Vector3.right, Laajuus = 0.45f, KayS = 10f, TaukoS = 12f },
            new LiikkuvaOsaMaaritys { Nimi = "kivi", Verkko = SegovianAkveduktiKivi, Pivot = SaKiviAlku, Liike = Liike.Nousu, Akseli = Vector3.up },
            new LiikkuvaOsaMaaritys { Nimi = "aamu", Verkko = SegovianAkveduktiAamu, Pivot = new Vector3(0f, 0f, -SaPaksuus * 0.62f), Liike = Liike.Valahdys },
            new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = SegovianAkveduktiValot, Pivot = Vector3.zero, Liike = Liike.Valahdys },
        };

        static readonly bool segovianAkvedukti = Rekisteroi("segovian-akvedukti",
            new Erikoismalli { Runko = SegovianAkveduktiRunko, Osat = SegovianAkveduktiOsat, Kolmiot0 = 1000, KokoKerroin = 1.5f });
    }
}
