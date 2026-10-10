#!/usr/bin/env python3
"""OMIEN MALLIEN VIENTIPORTIN TESTIT (Linssiseppä 2, 10.10.2026; PT 01.0x). Ajo: python3 tyokalut/omat_mallit_portti_testi.py

Synteettiset glTF-JSONit (portti lukee vain JSON-lohkon), tapaukset:
  puhdas malli · teksturoitu mesh kahdessa solmussa (ND:n puut) · teksturoitu materiaali kahdessa primitiivissä (KL:n atlas) ·
  teksturoimaton jaettu mesh (Concorden valaisimet: sallittu) · Riddarholmenin spiira erillisenä solmuna (sallittu) ·
  kaksi materiaalia samalla kuvalla (sallittu, vain tiedoksi) · glb-kääre ja --portti-komento kansiolle (paluuarvo 1/0).
"""
import json, os, struct, subprocess, sys, tempfile, unittest
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import omat_mallit_ktx2 as K


def gltf(solmut, meshit, materiaalit, kuvia=1):
    return {'asset': {'version': '2.0'}, 'nodes': solmut, 'meshes': meshit, 'materials': materiaalit,
            'images': [{'name': f'k{i}', 'mimeType': 'image/png', 'bufferView': 0} for i in range(kuvia)],
            'textures': [{'source': i} for i in range(kuvia)]}


TEKS = lambda nimi, kuva=0: {'name': nimi, 'pbrMetallicRoughness': {'baseColorTexture': {'index': kuva}}}
VARI = lambda nimi: {'name': nimi, 'pbrMetallicRoughness': {'baseColorFactor': [1, 1, 1, 1]}}
PRIM = lambda mat: {'attributes': {'POSITION': 0}, 'material': mat}


def glb(j):
    js = json.dumps(j).encode(); js += b' ' * ((4 - len(js) % 4) % 4); binr = b'\0' * 8
    return struct.pack('<4sII', b'glTF', 2, 28 + len(js) + len(binr)) + struct.pack('<I4s', len(js), b'JSON') + js + struct.pack('<I4s', len(binr), b'BIN\0') + binr


class Portti(unittest.TestCase):
    def test_puhdas(self):
        j = gltf([{'mesh': 0}, {'mesh': 1}], [{'primitives': [PRIM(0)]}, {'primitives': [PRIM(1)]}], [TEKS('a'), VARI('b')])
        self.assertEqual(K.portti_glb(j)[0], [])

    def test_instanssit_hylataan(self):   # ND:n puut: sama teksturoitu mesh 23 solmussa
        j = gltf([{'mesh': 0}, {'mesh': 0}, {'mesh': 0}], [{'name': 'puu_0', 'primitives': [PRIM(0)]}], [TEKS('puu')])
        v, arvio, kuvat = K.portti_glb(j)
        self.assertEqual(len(v), 1); self.assertIn('puu_0 3 solmussa', v[0]); self.assertEqual((arvio, kuvat), (3, 1))

    def test_materiaali_monessa_primitiivissa_hylataan(self):   # KL v6j: atlas 7 primitiivissä
        j = gltf([{'mesh': 0}, {'mesh': 1}], [{'primitives': [PRIM(0), PRIM(0)]}, {'primitives': [PRIM(0)]}], [TEKS('kl_atlas')])
        v, arvio, _ = K.portti_glb(j)
        self.assertEqual(len(v), 1); self.assertIn('kl_atlas 3 primitiivissä', v[0]); self.assertEqual(arvio, 3)

    def test_teksturoimaton_jaettu_sallitaan(self):   # Concorden valaisimet: ei tekstuuria → ei muistiansaa
        j = gltf([{'mesh': 0}] * 5 + [{'mesh': 1}], [{'primitives': [PRIM(0)]}, {'primitives': [PRIM(1)]}], [VARI('lasi'), TEKS('kivi')])
        self.assertEqual(K.portti_glb(j)[0], [])

    def test_spiira_erillisena_sallitaan(self):   # Riddarholmen: spiira piilotettava solmu samalla materiaalilla
        j = gltf([{'name': 'runko', 'mesh': 0}, {'name': 'spiira', 'mesh': 1}], [{'primitives': [PRIM(0)]}, {'primitives': [PRIM(0)]}], [TEKS('valurauta')])
        self.assertEqual(K.portti_glb(j)[0], [])

    def test_kaksi_materiaalia_samalla_kuvalla_tiedoksi(self):   # ND kivi_nd: eri materiaalit, sama kuva → sallittu, arvio > kuvat
        j = gltf([{'mesh': 0}, {'mesh': 1}], [{'primitives': [PRIM(0)]}, {'primitives': [PRIM(1)]}], [TEKS('a'), TEKS('b')])
        v, arvio, kuvat = K.portti_glb(j)
        self.assertEqual(v, []); self.assertGreater(arvio, kuvat)

    def test_komento_kansiolle(self):
        with tempfile.TemporaryDirectory() as td:
            for nimi, j in (('ok/lod0.glb', gltf([{'mesh': 0}], [{'primitives': [PRIM(0)]}], [TEKS('a')])),
                            ('nd/lod1.glb', gltf([{'mesh': 0}, {'mesh': 0}], [{'name': 'puu', 'primitives': [PRIM(0)]}], [TEKS('puu')]))):
                os.makedirs(os.path.join(td, os.path.dirname(nimi)), exist_ok=True); open(os.path.join(td, nimi), 'wb').write(glb(j))
            tyok = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'omat_mallit_ktx2.py')
            r = subprocess.run([sys.executable, tyok, '--portti', td], capture_output=True, text=True)
            self.assertEqual(r.returncode, 1, r.stdout); self.assertIn('puu 2 solmussa', r.stdout)
            os.remove(os.path.join(td, 'nd/lod1.glb'))
            self.assertEqual(subprocess.run([sys.executable, tyok, '--portti', td], capture_output=True).returncode, 0)


if __name__ == '__main__':
    unittest.main(verbosity=1)
