using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLIEN APURIT (Mallinseppä = Linssiseppä, omistaja 22.0x; speksipohja docs/raportit/erikoismalli-speksi-pohja.md):
    /// yhteinen paletti ja Rakentajan lisämuodot, joita erikoismallit (Mont-Saint-Michel, Stonehenge, Colosseum …) käyttävät.
    /// Jokainen muoto on yksi ääriviivaosa (EmOsaAlku/EmOsaLoppu), ja tahkojen etupuoli lasketaan ulospäin (KolmioUlos), joten mallin voi
    /// kirjoittaa välittämättä kiertosuunnasta. Paikallinen avaruus kuten muillakin: +Y ylös, +Z pohjoinen, +X itä, suurin
    /// vaakamitta noin 1,0 ja juuri maassa keskellä.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Erikoismallien paletti (omistajan hyväksymä seepiaramppi 21.4x: paperi #efe4cc, seepia #8a6a44, muste #3b2f22) ----
        static readonly Color EmPaperi = Hex(0xefe4cc), EmSeepia = Hex(0x8a6a44), EmMuste = Hex(0x3b2f22);
        /// <summary>Kallio ja kivi: lämmin harmaanruskea (ei harmaata; varjostin lämmittäisi alle 0,12:n kylläisyyden).</summary>
        static readonly Color EmKivi = Hex(0xb09d7c), EmKiviVaalea = Hex(0xcdbd98);
        /// <summary>Puut (hillitty tumma oliivi).</summary>
        static readonly Color EmPuu = Hex(0x6f7d52);
        /// <summary>Katot: tumma seepia (liuskekivi luetaan ylhäältä tummana lappeena).</summary>
        static readonly Color EmKatto = Hex(0x76603f);
        /// <summary>Hiekka ja vuorovesihiekka.</summary>
        static readonly Color EmHiekka = Hex(0xe6d6b0);
        /// <summary>Vesi: --sym-luonto-vesi #4a7690 vaalennettuna (kylläisyys ≥ 0,12, ettei varjostin lämmitä sitä pergamentiksi).</summary>
        static readonly Color EmVesi = Hex(0x8ea9b3);
        /// <summary>Vaahto ja kuunvalo: vaalein paperi.</summary>
        static readonly Color EmVaahto = Hex(0xf6f0e0);
        /// <summary>Kulta (--sym-ihme #b8862b hillittynä): patsas, aurinko ja säde.</summary>
        static readonly Color EmKulta = Hex(0xdcb466);
        /// <summary>Yövalo ikkunoissa (lämmin, hillitty).</summary>
        static readonly Color EmIkkunavalo = Hex(0xf0c878);
        /// <summary>Ruoho ja valli (hillitty oliivi paperiin sekoitettuna).</summary>
        static readonly Color EmRuoho = Hex(0xa9ae7c), EmValli = Hex(0x979c6a), EmVallinLaki = Hex(0xb6ba88);
        /// <summary>Kangas (velarium): --sym-historia #a05c3f 35 % paperiin.</summary>
        static readonly Color EmKangas = Hex(0xd2a888);

        sealed partial class Rakentaja
        {
            /// <summary>
            /// Ääriviivan osajako (ylhaalta-175:n Rakentaja: Alku/Loppu, UV1): jokainen apurimuoto on yksi osa. Junan
            /// Rakentajassa ei ole osajakoa, joten nämä ovat tyhjiä osittaismetodeja; kun ylhaalta-175 on junassa, sen
            /// Rakentajaan lisätään toteutukset <c>partial void EmOsaAlku() => Alku(); partial void EmOsaLoppu() => Loppu();</c>
            /// </summary>
            partial void EmOsaAlku();
            partial void EmOsaLoppu();

            /// <summary>Kokonaisen rakenteen (rengasmuuri, katsomo, luostari) aloitus yhtenä ääriviivaosana: sisäkkäiset muodot
            /// kuuluvat siihen, joten ääriviiva kiertää rakenteen ulkoreunaa eikä jokaista segmenttiä (ei sahalaitaa).</summary>
            public void AloitaOsa() => EmOsaAlku();
            public void LopetaOsa() => EmOsaLoppu();

            /// <summary>
            /// Kerroskallio: renkaat alhaalta ylös, joilla kullakin oma keskipiste (x, z), korkeus ja ellipsin puoliakselit;
            /// sama kulmajako ja toistettava säteen kohina kaikissa renkaissa (siemen), ylin rengas suljetaan lakitasolla.
            /// Keskipisteen siirto kerroksittain tekee rinteestä epäsymmetrisen (jyrkkä pohjoisrinne, loiva etelärinne).
            /// </summary>
            public void Kerroskallio((float y, float cx, float cz, float rx, float rz)[] renkaat, int k, int siemen, float vaihtelu,
                Color sivu, Color laki)
            {
                EmOsaAlku();
                var sat = new System.Random(siemen);
                var kohina = new float[k];
                for (int i = 0; i < k; i++) kohina[i] = 1f - vaihtelu * 0.5f + vaihtelu * (float)sat.NextDouble();
                var p = new Vector3[renkaat.Length, k];
                for (int j = 0; j < renkaat.Length; j++)
                    for (int i = 0; i < k; i++)
                    {
                        float a = i * Mathf.PI * 2f / k;
                        // Ylemmät renkaat saavat vähemmän kohinaa (laki on siistimpi kuin rantakivikko).
                        float s = Mathf.Lerp(kohina[i], 1f, 0.5f * j / Mathf.Max(1, renkaat.Length - 1));
                        var r = renkaat[j];
                        p[j, i] = new Vector3(r.cx + Mathf.Cos(a) * r.rx * s, r.y, r.cz + Mathf.Sin(a) * r.rz * s);
                    }
                for (int j = 0; j + 1 < renkaat.Length; j++)
                {
                    var c0 = new Vector3(renkaat[j].cx, renkaat[j].y, renkaat[j].cz);
                    var c1 = new Vector3(renkaat[j + 1].cx, renkaat[j + 1].y, renkaat[j + 1].cz);
                    var c = (c0 + c1) * 0.5f;
                    for (int i = 0; i < k; i++)
                    {
                        int q = (i + 1) % k;
                        NelioKeskelta(p[j, i], p[j + 1, i], p[j + 1, q], p[j, q], c, sivu);
                    }
                }
                int y = renkaat.Length - 1;
                var ylin = new Vector3(renkaat[y].cx, renkaat[y].y, renkaat[y].cz);
                for (int i = 0; i < k; i++) KolmioUlos(ylin, p[y, i], p[y, (i + 1) % k], Vector3.up, laki);
                EmOsaLoppu();
            }

            /// <summary>Suunnattu muuri pisteestä a pisteeseen b (pohja a.y/b.y), korkeus h ja paksuus: sivut, katto ja päädyt.</summary>
            public void Seina(Vector3 a, Vector3 b, float h, float paksuus, Color sivu, Color katto)
            {
                EmOsaAlku();
                var t = b - a; t.y = 0f;
                var n = Vector3.Cross(Vector3.up, t).normalized * (paksuus * 0.5f);
                Vector3 up = Vector3.up * h;
                Vector3 A = a - n, B = b - n, C = b + n, D = a + n;
                var keski = (a + b) * 0.5f + up * 0.5f;
                NelioKeskelta(A, B, B + up, A + up, keski, sivu);
                NelioKeskelta(D, C, C + up, D + up, keski, sivu);
                NelioKeskelta(A, D, D + up, A + up, keski, sivu);
                NelioKeskelta(B, C, C + up, B + up, keski, sivu);
                NelioUlos(A + up, B + up, C + up, D + up, Vector3.up, katto);
                EmOsaLoppu();
            }

            /// <summary>
            /// Suunnattu talo: pohjan keskipiste p, suunta (rad, harjan suunta itäakselista vastapäivään), leveys harjan
            /// suunnassa, syvyys, seinän korkeus ja harjan korkeus; seinät, harjakatto ja päädyt. 16 kolmiota.
            /// </summary>
            public void Talo(Vector3 p, float suunta, float leveys, float syvyys, float h, float harja, Color seina, Color katto)
            {
                EmOsaAlku();
                var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta)) * (leveys * 0.5f);
                var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta)) * (syvyys * 0.5f);
                Vector3 up = Vector3.up * h;
                Vector3 A = p - ex - ez, B = p + ex - ez, C = p + ex + ez, D = p - ex + ez;
                var keski = p + up * 0.5f;
                NelioKeskelta(A, B, B + up, A + up, keski, seina);
                NelioKeskelta(B, C, C + up, B + up, keski, seina);
                NelioKeskelta(C, D, D + up, C + up, keski, seina);
                NelioKeskelta(D, A, A + up, D + up, keski, seina);
                Vector3 H1 = p - ex + up + Vector3.up * harja, H2 = p + ex + up + Vector3.up * harja;
                var kk = p + up + Vector3.up * (harja * 0.3f);
                NelioKeskelta(A + up, B + up, H2, H1, kk, katto);
                NelioKeskelta(D + up, C + up, H2, H1, kk, katto);
                KolmioKeskelta(A + up, D + up, H1, kk, seina);
                KolmioKeskelta(B + up, C + up, H2, kk, seina);
                EmOsaLoppu();
            }

            /// <summary>Kaksoispyramidi (patsas, aurinkokiekon hohde, lampaan pää): keskipiste k, säde r ja puolikorkeus h. 8 kolmiota.</summary>
            public void Timantti(Vector3 k, float r, float h, Color vari, int sivuja = 4)
            {
                EmOsaAlku();
                Vector3 yla = k + Vector3.up * h, ala = k - Vector3.up * h;
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                    Vector3 p0 = k + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * r, p1 = k + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * r;
                    KolmioKeskelta(p0, p1, yla, k, vari);
                    KolmioKeskelta(p1, p0, ala, k, vari);
                }
                EmOsaLoppu();
            }

            /// <summary>Vaakasuora kiekko (hiekka, areena, maa): keskipiste p, säteet rx ja rz, n sektoria, etupuoli ylös.</summary>
            public void Kiekko(Vector3 p, float rx, float rz, int n, Color vari)
            {
                EmOsaAlku();
                for (int i = 0; i < n; i++)
                {
                    float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                    KolmioUlos(p, p + new Vector3(Mathf.Cos(a0) * rx, 0f, Mathf.Sin(a0) * rz), p + new Vector3(Mathf.Cos(a1) * rx, 0f, Mathf.Sin(a1) * rz), Vector3.up, vari);
                }
                EmOsaLoppu();
            }

            /// <summary>Vaakasuora rengas kahden ellipsin välissä (vesi, vaahto, valli): sisä- ja ulkoellipsi omilla
            /// keskipisteillään, korkeus y, n sektoria, etupuoli ylös.</summary>
            public void Rengas(float y, (float cx, float cz, float rx, float rz) sisa, (float cx, float cz, float rx, float rz) ulko, int n, Color vari)
            {
                EmOsaAlku();
                for (int i = 0; i < n; i++)
                {
                    float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                    Vector3 s0 = new Vector3(sisa.cx + Mathf.Cos(a0) * sisa.rx, y, sisa.cz + Mathf.Sin(a0) * sisa.rz);
                    Vector3 s1 = new Vector3(sisa.cx + Mathf.Cos(a1) * sisa.rx, y, sisa.cz + Mathf.Sin(a1) * sisa.rz);
                    Vector3 u0 = new Vector3(ulko.cx + Mathf.Cos(a0) * ulko.rx, y, ulko.cz + Mathf.Sin(a0) * ulko.rz);
                    Vector3 u1 = new Vector3(ulko.cx + Mathf.Cos(a1) * ulko.rx, y, ulko.cz + Mathf.Sin(a1) * ulko.rz);
                    NelioUlos(s0, u0, u1, s1, Vector3.up, vari);
                }
                EmOsaLoppu();
            }

            /// <summary>Holvikaaren aukko seinän pintaan: suorakulmio ja puoliympyrän muotoinen laki (3 lohkoa); p = aukon keskipiste,
            /// korkeus sisältää laen. 5 kolmiota.</summary>
            public void Holvi(Vector3 p, Vector3 ulos, float leveys, float korkeus, Color vari)
            {
                var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
                var t = Vector3.Cross(Vector3.up, n);
                float w = leveys * 0.5f, suora = korkeus - w;
                var q = p + n * 0.0015f - Vector3.up * (korkeus * 0.5f);
                Vector3 a0 = q - t * w, a1 = q + t * w, b1 = a1 + Vector3.up * suora, b0 = a0 + Vector3.up * suora;
                NelioUlos(a0, a1, b1, b0, n, vari);
                var keski = q + Vector3.up * suora;
                Vector3 edellinen = b1;
                for (int i = 1; i <= 3; i++)
                {
                    float kulma = i * Mathf.PI / 3f;
                    var seuraava = keski + t * (Mathf.Cos(kulma) * w) + Vector3.up * (Mathf.Sin(kulma) * w);
                    KolmioUlos(keski, edellinen, seuraava, n, vari);
                    edellinen = seuraava;
                }
            }

            /// <summary>Pystysuora nelikulmio seinän pintaan (ikkuna, holvikaari, tukipilari): keskipiste p seinän pinnassa,
            /// ulospäin osoittava normaali, leveys ja korkeus; hieman seinän edessä, ettei se välky.</summary>
            public void Laatta(Vector3 p, Vector3 ulos, float leveys, float korkeus, Color vari)
            {
                var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
                var t = Vector3.Cross(Vector3.up, n) * (leveys * 0.5f);
                var q = p + n * 0.0015f;
                Vector3 y0 = Vector3.up * (-korkeus * 0.5f), y1 = Vector3.up * (korkeus * 0.5f);
                NelioUlos(q - t + y0, q + t + y0, q + t + y1, q - t + y1, n, vari);
            }
        }
    }
}
