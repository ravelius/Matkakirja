// M-OSAN JUMITESTIT (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huoneet 6–10, kohta 11 "ei jumia"; Siirtosepän
// työnjako junaan 167). M-osan eteneminen oikeilla ytimillä: naamio ja kulho (huone 6), VoudinKiista ja avainrengas (ote ranteesta →
// irtipääsy tai tyrmä), LukittuOvi (7), köysikieppi ja Kiipeily (8; lyhty puolivälissä, havaittu → tyrmä), Komero (9), Pako (10; köysilasku
// Kiipeilyllä, myöhästyminen → tyrmä ja uusi yritys) ja Tyrma kolmella muunnelmalla. Kiinnijäänti vie tyrmään ja tarkistuspisteeseen;
// maailma (naamio, avaimet, ovi, köysi, tiilet, kilvet, arkku) säilyy kuten Unityssa. 1 000 satunnaista tekosarjaa siemenellä: jokaisesta
// saavutetusta tilasta kurinalainen pelaaja (Ratkaise) pääsee pakoon asti, eikä mikään sarja jää jumiin. Tallennus ja jatko (MTila,
// Siirtoseppä 8.10.): Tayta kuten Unityn TaytaM:t, Jatka kuten PalautaM:t (Esineet, Sali, Komero, Pako) — jatko missä tahansa → loppuun.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class MOsanJumiTestit
    {
        const double Dt = 0.05;

        public enum MTeko
        {
            PueNaamio, OtaKulho, AsetaKulho, OtaAvaimet, Irrottaudu, AvaaOvi, AvaaOviNopeasti, OtaKoysi, KiinnitaKoysi,
            KiipeaEteen, KiipeaTaakse, Raavi, RaaviNopeasti, KaannaKilpi1, KaannaKilpi2, AvaaArkku, KiinnitaKramppiin, LaskeEteen, KuittaaLoyto,
            KulkeKalliolla, Katkaise, Odota, Kiinni, TyrmaPoimi, TyrmaAvaa, TyrmaUlos, TyrmaKivi, TyrmaKoputa,
        }

        /// <summary>M-osan tila oikeilla ytimillä; pelaajan sijaintia ei mallinneta (huonesimulaatio hoitaa reitin), vain teot ja ajat.</summary>
        public sealed class MKulku
        {
            public bool Naamio, KulhoKadessa, KulhoPoydalla, Avaimet, OteRanteesta, OviAuki, Koysikieppi, KoysiSakarassa, KiipeilyValmis, Valmis;
            public readonly VoudinKiista Kiista = new VoudinKiista();
            public Kiipeily Kiipeily, Lasku;
            public readonly Komero Komero = new Komero();
            public readonly Pako Pako = new Pako();
            public Tyrma Tyrma; public int Tyrmia, Muunnelma;
            /// <summary>Arkku auki, löytö näkyvissä (SeikkailuKomero.Auki → NaytaLoyto); kuittaus laukaisee ArkkuAuki → pako. Ei tallennu.</summary>
            public bool LoytoNakyvissa;
            bool lyhtyKiipeily, lyhtyLasku; double kallioS;
            public double T;
            readonly double voutiDx, voutiDz, voutiYaw;
            readonly Random r;

            public MKulku(Random r = null)
            {
                this.r = r ?? new Random(0);
                KavelyMerkki poyta = null, vouti = null;
                foreach (var m in Huonesimulaatio.Data.Merkit) { if (m.Nimi == "reitti:pelaaja-57") poyta = m; else if (m.Nimi == "istuu:vouti") vouti = m; }
                voutiDx = poyta.X - vouti.X; voutiDz = poyta.Z - vouti.Z; voutiYaw = vouti.KiertoY.Value * 180 / Math.PI;
            }

            public bool Tyrmassa => Tyrma != null;

            void Kiinni()
            {
                if (Tyrmassa || Valmis) return;
                Tyrma = new Tyrma(Muunnelma % 3 + 1); Muunnelma++; Tyrmia++; OteRanteesta = false;
                if (Kiipeily != null && !KiipeilyValmis) Kiipeily = null;   // LopetaOteKiipeily: alusta (köysi jää sakaraan)
                if (Pako.Vaihe == PakoVaihe.Lasku) Lasku = null;
                Pako.Kiinni();   // SeikkailuPako kuuntelee SeikkailuVartijat.Kiinnijaatiin
            }

            void Aika(double dt)
            {
                T += dt;
                Kiista.Paivita(dt); Komero.Tiilet.Paivita(dt);
                if (Tyrmassa) { Tyrma.Paivita(dt); return; }
                if (OteRanteesta) return;
                bool kalliolla = Pako.Vaihe == PakoVaihe.Kallio;
                if (kalliolla) kallioS += dt;
                Pako.Paivita(dt, kalliolla && kallioS >= 7);   // kallio pako-1 → -5 noin 7 s kävellen K4:lle
                if (Pako.Myohastyi) { Pako.Myohastyi = false; Kiinni(); }
                if (Pako.Vaihe == PakoVaihe.Valmis) Valmis = true;
            }

            void KiipeilyAskel(Kiipeily k, int suunta, ref bool lyhty)
            {
                if (k == null || k.Perilla) return;
                for (int i = 0; i < 6; i++)
                {
                    k.Paivita(Dt, suunta); Aika(Dt);
                    if (!lyhty && k.Ote >= k.Otteita / 2 && k.Siirtyy == 0) { lyhty = true; k.LyhtyYlla(); }
                    if (k.Havaittu) { k.Havaittu = false; Kiinni(); return; }
                }
            }

            /// <summary>Teko; palauttaa, oliko se mahdollinen (muuten ei muutosta).</summary>
            public bool Tee(MTeko t)
            {
                if (Valmis) return false;
                if (Tyrmassa)
                {
                    bool ok = false;
                    if (t == MTeko.TyrmaPoimi) ok = Tyrma.Poimi();
                    else if (t == MTeko.TyrmaAvaa) ok = Tyrma.AvaaOvi();
                    else if (t == MTeko.TyrmaKivi) ok = Tyrma.KiviIrti();
                    else if (t == MTeko.TyrmaUlos) ok = Tyrma.Ulos();
                    else if (t == MTeko.TyrmaKoputa) { Tyrma.Yritys(); ok = true; }
                    else if (t == MTeko.Odota) { Aika(1); ok = true; }
                    if (Tyrma.Vaihe == TyrmanVaihe.Ulkona) Tyrma = null;   // tarkistuspisteeseen
                    return ok;
                }
                if (OteRanteesta && t != MTeko.Irrottaudu && t != MTeko.Odota && t != MTeko.Kiinni) return false;
                switch (t)
                {
                    case MTeko.PueNaamio: if (Naamio) return false; Naamio = true; return true;
                    case MTeko.OtaKulho:
                        if (KulhoKadessa || KulhoPoydalla) return false;
                        KulhoKadessa = Naamio;   // ilman naamiota apulainen ottaa kulhon ja epäilee (kulho takaisin pöytään)
                        return true;
                    case MTeko.AsetaKulho: if (!KulhoKadessa) return false; KulhoKadessa = false; KulhoPoydalla = true; Kiista.KulhoLaskettu(1.0); return true;
                    case MTeko.OtaAvaimet:
                        if (Avaimet) return false;
                        if (Kiista.SaaOttaa(voutiDx, voutiDz, voutiYaw)) { Avaimet = true; return true; }
                        OteRanteesta = true; return true;   // ote ranteesta: irtipääsy tai tyrmä
                    case MTeko.Irrottaudu: if (!OteRanteesta) return false; OteRanteesta = false; return true;
                    case MTeko.AvaaOvi: case MTeko.AvaaOviNopeasti:
                        if (OviAuki) return false;
                        OviAuki = LukittuOvi.Avaa(true, "avainrengas", Avaimet ? new[] { "avainrengas" } : Array.Empty<string>(), t == MTeko.AvaaOviNopeasti) != OviTulos.Lukossa;
                        return true;
                    case MTeko.OtaKoysi: if (!OviAuki || Koysikieppi) return false; Koysikieppi = true; return true;
                    case MTeko.KiinnitaKoysi: if (!Koysikieppi || KoysiSakarassa) return false; KoysiSakarassa = true; return true;
                    case MTeko.KiipeaEteen: case MTeko.KiipeaTaakse:
                        if (!KoysiSakarassa || KiipeilyValmis) return false;
                        Kiipeily ??= new Kiipeily(10, new[] { 3, 7 });
                        KiipeilyAskel(Kiipeily, t == MTeko.KiipeaEteen ? 1 : -1, ref lyhtyKiipeily);
                        if (Kiipeily != null && Kiipeily.Perilla) KiipeilyValmis = true;
                        return true;
                    case MTeko.Raavi: case MTeko.RaaviNopeasti:
                        if (!KiipeilyValmis) return false;
                        for (int i = 0; i < Komero.Tiilet.Maara; i++) if (!Komero.Tiilet.Irti(i)) { Komero.Raavi(i, t == MTeko.RaaviNopeasti ? 1 : 0); return true; }
                        return false;
                    case MTeko.KaannaKilpi1: case MTeko.KaannaKilpi2: return KiipeilyValmis && !double.IsNaN(Komero.KaannaKilpea(t == MTeko.KaannaKilpi1 ? 1 : 2));
                    case MTeko.AvaaArkku:
                        if (!KiipeilyValmis || Komero.Auki) return false;
                        if (Komero.Avaa() == KilpiTulos.Auki) LoytoNakyvissa = true;
                        return true;
                    case MTeko.KuittaaLoyto: if (!LoytoNakyvissa) return false; LoytoNakyvissa = false; Pako.ArkkuAuki(); return true;
                    case MTeko.KiinnitaKramppiin:
                        if (!Pako.Kiinnita()) return false;
                        Lasku = new Kiipeily(14); lyhtyLasku = false; kallioS = 0; return true;
                    case MTeko.LaskeEteen:
                        if (Pako.Vaihe != PakoVaihe.Lasku || Lasku == null) return false;
                        KiipeilyAskel(Lasku, 1, ref lyhtyLasku);
                        if (Lasku != null && Lasku.Perilla) Pako.LaskuValmis();
                        return true;
                    case MTeko.KulkeKalliolla: if (Pako.Vaihe != PakoVaihe.Kallio) return false; Aika(1); return true;
                    case MTeko.Katkaise: return Pako.Katkaise();
                    case MTeko.Odota:
                        // Kiipeillessä ja köysilaskussa paikallaan (puuskat, lyhty ja himmennys kuluvat), muuten aika kuluu.
                        if (Pako.Vaihe == PakoVaihe.Lasku && Lasku != null && !Lasku.Perilla) { for (int i = 0; i < 3; i++) KiipeilyAskel(Lasku, 0, ref lyhtyLasku); if (Lasku != null && Lasku.Perilla) Pako.LaskuValmis(); }
                        else if (KoysiSakarassa && !KiipeilyValmis && Kiipeily != null) for (int i = 0; i < 3; i++) KiipeilyAskel(Kiipeily, 0, ref lyhtyKiipeily);
                        else Aika(1);
                        return true;
                    case MTeko.Kiinni: Kiinni(); return true;
                }
                return false;
            }

            /// <summary>Tallennettava M-tila kuten Unityn TaytaM:t (SeikkailuEsineet, -Sali, -Komero, -Pako).</summary>
            public MTila Tayta()
            {
                var m = new MTila();
                if (Naamio) { m.Puettu.Add("esiliina"); m.Puettu.Add("myssy"); }
                m.Avainrengas = Avaimet; if (OviAuki) m.AvatutOvet.Add("muurikaytava"); m.Koysi = KoysiSakarassa;
                m.Kulho = Kiista.Kiista >= 0;
                for (int i = 0; i < Komero.Tiilet.Maara; i++) if (Komero.Tiilet.Irti(i)) m.Tiilet |= 1 << i;
                m.Kilpi1 = Komero.Lukko.Kilpi1; m.Kilpi2 = Komero.Lukko.Kilpi2; m.Arkku = Komero.Auki;
                m.Kello = Pako.Vaihe != PakoVaihe.Odottaa;
                return m;
            }

            /// <summary>Jatko tallennuksesta kuten Unityn PalautaM:t: maailma palautuu, kiipeily ja ohjatut jaksot eivät (jatko tarkistuspisteestä;
            /// komerossa jo työskennellyt on komerossa).</summary>
            public static MKulku Jatka(MTila m, Random r = null)
            {
                var k = new MKulku(r);
                k.Naamio = m.Naamio; k.Avaimet = m.Avainrengas; k.OviAuki = m.AvatutOvet.Contains("muurikaytava");
                if (m.Koysi) { k.KoysiSakarassa = true; k.Koysikieppi = true; }
                if (m.Kulho && k.Kiista.KulhoLaskettu(0)) k.KulhoPoydalla = true;
                for (int i = 0; i < k.Komero.Tiilet.Maara && i < 30; i++) if ((m.Tiilet & (1 << i)) != 0) k.Komero.Tiilet.AsetaIrti(i);
                k.Komero.Lukko.Kaanna(1, m.Kilpi1 - k.Komero.Lukko.Kilpi1); k.Komero.Lukko.Kaanna(2, m.Kilpi2 - k.Komero.Lukko.Kilpi2);
                if (m.Arkku) k.Komero.Lukko.Kokeile();
                if (m.Kello || m.Arkku) k.Pako.ArkkuAuki();   // SeikkailuKomero.PalautaM: arkku auki ilman kelloa → ArkkuAuki (LS2 8.10.)
                k.KiipeilyValmis = m.Tiilet != 0 || m.Arkku || m.Kello;
                return k;
            }

            /// <summary>Kurinalainen pelaaja: seuraava järkevä teko tilasta (paikallaan varoituksissa, hidas veto, kilvet 45°).</summary>
            public MTeko Seuraava()
            {
                if (Tyrmassa)
                    return Tyrma.Vaihe switch
                    {
                        TyrmanVaihe.AvaimetOlissa => MTeko.TyrmaPoimi, TyrmanVaihe.AvaimetKadessa => MTeko.TyrmaAvaa, TyrmanVaihe.OviAuki => MTeko.TyrmaUlos,
                        _ => Tyrma.Muunnelma == 3 ? MTeko.TyrmaKivi : MTeko.Odota,
                    };
                if (OteRanteesta) return MTeko.Irrottaudu;
                if (!Naamio) return MTeko.PueNaamio;
                if (!Avaimet)
                {
                    if (!KulhoPoydalla) return KulhoKadessa ? MTeko.AsetaKulho : MTeko.OtaKulho;
                    return Kiista.KatsooPois ? MTeko.OtaAvaimet : MTeko.Odota;
                }
                if (!OviAuki) return MTeko.AvaaOvi;
                if (!Koysikieppi) return MTeko.OtaKoysi;
                if (!KoysiSakarassa) return MTeko.KiinnitaKoysi;
                if (!KiipeilyValmis)
                {
                    var k = Kiipeily;
                    bool seis = k != null && (k.PuuskaVaroittaa || k.Puuska || k.LyhtyVaroittaa || k.LyhtyValaisee || k.Himmenee);
                    return seis ? MTeko.Odota : MTeko.KiipeaEteen;
                }
                if (!Komero.Tiilet.KaikkiIrti) return MTeko.Raavi;
                if (!Komero.Auki)
                {
                    if (Math.Abs(Komero.Lukko.Kilpi1 - Komero.Lukko.TavoiteAste) > Komero.Lukko.SallittuAste) return MTeko.KaannaKilpi1;
                    if (Math.Abs(Komero.Lukko.Kilpi2 - Komero.Lukko.TavoiteAste) > Komero.Lukko.SallittuAste) return MTeko.KaannaKilpi2;
                    return MTeko.AvaaArkku;
                }
                if (LoytoNakyvissa) return MTeko.KuittaaLoyto;
                switch (Pako.Vaihe)
                {
                    case PakoVaihe.Odottaa: return MTeko.AvaaArkku;
                    case PakoVaihe.Kello: return MTeko.KiinnitaKramppiin;
                    case PakoVaihe.Lasku:
                        var l = Lasku;
                        return l != null && (l.LyhtyVaroittaa || l.LyhtyValaisee || l.Himmenee) ? MTeko.Odota : MTeko.LaskeEteen;
                    case PakoVaihe.Kallio: return MTeko.KulkeKalliolla;
                    case PakoVaihe.Koysi: return MTeko.Katkaise;
                    default: return MTeko.Odota;
                }
            }

            /// <summary>Kurinalainen loppuun; palauttaa kuluneen ajan tai −1 (jumi).</summary>
            public double Ratkaise(double maxS = 900)
            {
                double alku = T;
                for (int n = 0; n < 20000 && !Valmis && T - alku < maxS; n++)
                {
                    var t = Seuraava();
                    if (!Tee(t) && t != MTeko.Odota) Tee(MTeko.Odota);
                }
                return Valmis ? T - alku : -1;
            }
        }

        [Testi] static void KurinalainenLapiIlmanTyrmaa()
        {
            var m = new MKulku();
            double t = m.Ratkaise();
            Console.WriteLine($"      M-kulku kurinalaisesti: {t:F0} s (teot, odotukset, kiipeily ja pako; kävely huonesimulaatiossa)");
            Oleta.Tosi(t > 0 && m.Tyrmia == 0, $"valmis ilman tyrmää ({t:F0} s, tyrmiä {m.Tyrmia})");
        }

        [Testi] static void TyrmaJokaisessaVaiheessaEiJumia()
        {
            // Kiinnijäänti ennen jokaista kurinalaisen pelaajan tekoa (kaikki kolme tyrmän muunnelmaa vuorollaan): aina loppuun.
            var pohja = new MKulku(); var teot = new List<MTeko>();
            for (int n = 0; n < 20000 && !pohja.Valmis; n++) { var t = pohja.Seuraava(); teot.Add(t); if (!pohja.Tee(t) && t != MTeko.Odota) pohja.Tee(MTeko.Odota); }
            int kokeiltu = 0;
            for (int i = 0; i < teot.Count; i += Math.Max(1, teot.Count / 120))
            {
                var m = new MKulku();
                for (int j = 0; j < i; j++) if (!m.Tee(teot[j]) && teot[j] != MTeko.Odota) m.Tee(MTeko.Odota);
                m.Tee(MTeko.Kiinni);
                double t = m.Ratkaise();
                Oleta.Tosi(t > 0, $"kiinni teon {i} ({teot[i]}) kohdalla: jumi");
                kokeiltu++;
            }
            Console.WriteLine($"      tyrmä {kokeiltu} kohdassa {teot.Count} teosta: aina loppuun");
        }

        [Testi] static void SatunnaisetTekosarjatEivatJumita()
        {
            var r = new Random(31); var kaikki = (MTeko[])Enum.GetValues(typeof(MTeko)); int tyrmia = 0, valmiita = 0; double pisin = 0;
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var m = new MKulku(r);
                int n = r.Next(400);
                for (int i = 0; i < n && !m.Valmis; i++)
                {
                    // Satunnainen teko, välillä kurinalaisen seuraava (pääsee pidemmälle), harvoin kiinnijäänti.
                    var t = r.Next(10) == 0 ? MTeko.Kiinni : r.Next(2) == 0 ? m.Seuraava() : kaikki[r.Next(kaikki.Length)];
                    m.Tee(t);
                }
                if (m.Valmis) { valmiita++; continue; }
                tyrmia += m.Tyrmia;
                double aika = m.Ratkaise();
                Oleta.Tosi(aika > 0, $"ajo {ajo}: jumi (naamio {m.Naamio}, avaimet {m.Avaimet}, ovi {m.OviAuki}, köysi {m.KoysiSakarassa}, kiipeily {m.KiipeilyValmis}, arkku {m.Komero.Auki}, pako {m.Pako.Vaihe}, tyrmässä {m.Tyrmassa})");
                pisin = Math.Max(pisin, aika);
            }
            Console.WriteLine($"      satunnaiset: 1 000 ajoa, tyrmiä {tyrmia}, valmiiksi sattumalta {valmiita}, pisin ratkaisu {pisin:F0} s");
            Oleta.Tosi(tyrmia > 100, $"tyrmiä syntyi ({tyrmia})");
        }

        [Testi] static void TallennusJaJatkoMissaTahansaEiJumia()
        {
            // Kurinalaisen kulun jokaisessa kohdassa ja 1 000 satunnaisessa sarjassa: tallennus → lopetus → jatko → loppuun.
            var pohja = new MKulku(); var teot = new List<MTeko>();
            for (int n = 0; n < 20000 && !pohja.Valmis; n++) { var t = pohja.Seuraava(); teot.Add(t); if (!pohja.Tee(t) && t != MTeko.Odota) pohja.Tee(MTeko.Odota); }
            int kohtia = 0;
            for (int i = 0; i < teot.Count; i++)
            {
                var m = new MKulku();
                for (int j = 0; j < i; j++) if (!m.Tee(teot[j]) && teot[j] != MTeko.Odota) m.Tee(MTeko.Odota);
                if (m.Valmis || m.Tyrmassa) continue;
                var t = new SeikkailuTallennus(); m.Tayta().Kirjoita(t);
                var jatko = MKulku.Jatka(MTila.Lue(SeikkailuTallennus.Lue(t.Kirjoita())));
                double aika = jatko.Ratkaise();
                Oleta.Tosi(aika > 0, $"jatko teon {i} ({teot[i]}) jälkeen: jumi (avaimet {jatko.Avaimet}, ovi {jatko.OviAuki}, köysi {jatko.KoysiSakarassa}, arkku {jatko.Komero.Auki}, pako {jatko.Pako.Vaihe})");
                kohtia++;
            }
            var r = new Random(37); var kaikki = (MTeko[])Enum.GetValues(typeof(MTeko));
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var m = new MKulku(r); int n = r.Next(400);
                for (int i = 0; i < n && !m.Valmis; i++) m.Tee(r.Next(10) == 0 ? MTeko.Kiinni : r.Next(2) == 0 ? m.Seuraava() : kaikki[r.Next(kaikki.Length)]);
                if (m.Valmis || m.Tyrmassa) continue;
                var t = new SeikkailuTallennus(); m.Tayta().Kirjoita(t);
                var jatko = MKulku.Jatka(MTila.Lue(SeikkailuTallennus.Lue(t.Kirjoita())), r);
                Oleta.Tosi(jatko.Ratkaise() > 0, $"ajo {ajo}: jatko jumissa (arkku {jatko.Komero.Auki}, pako {jatko.Pako.Vaihe}, köysi {jatko.KoysiSakarassa})");
            }
            Console.WriteLine($"      tallennus ja jatko: {kohtia} kohtaa + 1 000 satunnaista, aina loppuun");
        }
    }
}
