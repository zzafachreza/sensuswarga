import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import Pdf from 'react-native-pdf';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap } from '../../components';
import { useIsFocused } from '@react-navigation/native';


export default function SHasil({ navigation, route }) {
    const item = route.params;
    console.log(item);

    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [comp, setComp] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }
    }, [isFocused]);




    const __getTransaction = () => {

        axios.post(apiURL + 'keluarga', {
            nomor_kk: route.params.nomor_kk
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        });

        axios.post(apiURL + 'company').then(res => {
            console.log(res.data);
            setComp(res.data);
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })


    }


    const MyListData = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    flex: 1,
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    flex: 0.1,
                }}>:</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                    flex: 1,
                }}>{value}</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>

            <View style={{
                height: 80,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 14,
                        flex: 1,
                    }}>PT</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.pt}</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 14,
                        flex: 1,
                    }}>Tahun dan Bulan Pendataan</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: 14
                    }}>{item.bulan_tahun}</Text>
                </View>

            </View>

            {!loading && <>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>
                        <MyListData label='Nama Kepala Keluarga' value={item.kepala_keluarga} />
                        <MyListData label='No KK*' value={item.nomor_kk} />

                        <MyListData label='Type Rumah*' value={item.tipe_rumah} />
                        <MyListData label='Blok*' value={item.blok_rumah} />
                        <MyListData label='No. Rumah*' value={item.nomor_rumah} />
                        <MyListData label='Nama Anggota Keluarga*' value={item.nama_anggota_keluarga} />
                        <MyListData label='NIK KTP' value={item.nomor_ktp} />
                        <MyListData label='NIK Karyawan' value={item.nik_karyawan} />


                        <MyListData label='L/P*' value={item.jenis_kelamin} />
                        <MyListData label='Status Hubungan dalam Keluarga*' value={item.status_hubungan_keluarga} />
                        <MyListData label='Status Perkawinan' value={item.status_perkawinan} />
                        <MyListData label='Akta Lahir' value={item.akta_lahir} />
                        <MyListData label='Alamat tinggal Sesuai KTP' value={item.alamat_ktp} />
                        <MyListData label='Alamat Sekatang' value={item.alamat_sekarang} />
                        <MyListData label='Tempat Lahir' value={item.tempat_lahir} />
                        <MyListData label='Tanggal lahir*' value={item.tanggal_lahir} />
                        <MyListData label='Usia' value={item.usia} />
                        <MyListData label='Agama' value={item.agama} />
                        <MyListData label='Suku' value={item.suku} />
                        <MyListData label='Pendidikan Terakhir yang ditamatkan*' value={item.pendidikan_terakhir} />
                        <Text style={{
                            marginTop: 5,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            color: colors.primary,
                        }}>Pendidikan Sekarang</Text>
                        <MyListData label='Jenjang Pendidikan' value={item.jenjang_pendidikan} />
                        <MyListData label='Nama Sekolah' value={item.nama_sekolah} />
                        <MyListData label='Jenis Sekolah' value={item.jenis_sekolah} />
                        <MyGap jarak={5} />
                        <MyListData label='Alasan Jika Anak Tidak Sekolah' value={item.alasan_anak_tidak_sekolah} />
                        <MyListData label='Status Pekerjaan*' value={item.status_pekerjaan} />
                        <MyListData label='Status Tinggal*' value={item.status_tinggal} />
                        <MyListData label='Alamat Asal Pengunjung' value={item.alamat_asal_pengunjung} />
                        <MyListData label='Ket' value={item.keterangan} />

                        <Text style={{
                            marginTop: 5,
                            textAlign: 'center',
                            marginTop: 10,
                            borderBottomWidth: 1,
                            paddingBottom: 5,
                            borderBottomColor: colors.primary,
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.primary,
                            marginBottom: 10,
                        }}>Anggota Keluarga</Text>

                        {data.length > 0 && data.map(i => {
                            return (
                                <View style={{
                                    marginBottom: 5,
                                    backgroundColor: colors.white,
                                    padding: 10,
                                }}>
                                    <TouchableOpacity onPress={() => Alert.alert('Sensus Warga', 'Apakah Anda akan menghapus ini ?', [
                                        { text: 'TIDAK' },
                                        {
                                            text: 'HAPUS',
                                            onPress: () => {
                                                console.log(i.id);
                                                axios.post(apiURL + 'hapus_keluarga', {
                                                    id: i.id
                                                }).then(res => {
                                                    __getTransaction();
                                                })
                                            }
                                        }
                                    ])} style={{
                                        padding: 10,
                                        backgroundColor: colors.danger,
                                        width: 100,
                                        borderRadius: 10,
                                        alignSelf: 'flex-end',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.white
                                        }}>Hapus</Text>
                                    </TouchableOpacity>
                                    <MyListData label='Status Hubungan dalam Keluarga*' value={i.status_hubungan_keluarga} />
                                    <MyListData label='NIK KTP' value={i.nomor_ktp} />
                                    <MyListData label='Nama Anggota Keluarga*' value={i.nama_anggota_keluarga} />
                                    <MyListData label='L/P*' value={i.jenis_kelamin} />
                                    <MyListData label='Status Perkawinan' value={i.status_perkawinan} />
                                    <MyListData label='Akta Lahir' value={i.akta_lahir} />
                                    <MyListData label='Alamat tinggal Sesuai KTP' value={i.alamat_ktp} />
                                    <MyListData label='Alamat Sekatang' value={i.alamat_sekarang} />
                                    <MyListData label='Tempat Lahir' value={i.tempat_lahir} />
                                    <MyListData label='Tanggal lahir*' value={i.tanggal_lahir} />
                                    <MyListData label='Usia' value={i.usia} />
                                    <MyListData label='Agama' value={i.agama} />
                                    <MyListData label='Suku' value={i.suku} />
                                    <MyListData label='Pendidikan Terakhir yang ditamatkan*' value={i.pendidikan_terakhir} />
                                    <Text style={{
                                        marginTop: 5,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        color: colors.primary,
                                    }}>Pendidikan Sekarang</Text>
                                    <MyListData label='Jenjang Pendidikan' value={i.jenjang_pendidikan} />
                                    <MyListData label='Nama Sekolah' value={i.nama_sekolah} />
                                    <MyListData label='Jenis Sekolah' value={i.jenis_sekolah} />
                                    <MyGap jarak={5} />
                                    <MyListData label='Alasan Jika Anak Tidak Sekolah' value={i.alasan_anak_tidak_sekolah} />
                                    <MyListData label='Status Pekerjaan*' value={i.status_pekerjaan} />
                                    <MyListData label='Status Tinggal*' value={i.status_tinggal} />
                                    <MyListData label='Alamat Asal Pengunjung' value={i.alamat_asal_pengunjung} />
                                    <MyListData label='Ket' value={i.keterangan} />
                                </View>
                            )
                        })}

                        <MyButton onPress={() => navigation.navigate('SAdd2', item)} warna={colors.secondary} title="Tambah Anggota Keluarga" Icons="person-add" />
                    </View>

                </ScrollView>


                <View style={{
                    flexDirection: 'row'
                }}>

                    <View style={{
                        flex: 1
                    }}>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('Sensus Penduduk', 'Apakah kamu yakin akan hapus ini ?', [
                                {
                                    style: 'cancel',
                                    text: 'Batal'
                                },
                                {
                                    style: 'default',
                                    text: 'Hapus',
                                    onPress: () => {

                                        console.log(item.id_penduduk);
                                        axios.post(apiURL + 'delete_penduduk', {
                                            id_penduduk: item.id_penduduk
                                        }).then(res => {
                                            console.log(res.data);
                                            navigation.goBack();
                                            showMessage({
                                                type: 'success',
                                                message: 'Data berhasil dihapus !'
                                            })
                                        })

                                    }
                                }
                            ])
                        }} style={{
                            padding: 15,
                            backgroundColor: colors.danger
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,
                                color: colors.white,
                                textAlign: 'center'
                            }}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                    {comp.bisa_edit == 'YA' && <View style={{
                        flex: 1,
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('SEdit', item)} style={{
                            padding: 15,
                            backgroundColor: colors.secondary
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,
                                color: colors.white,
                                textAlign: 'center'
                            }}>Edit</Text>
                        </TouchableOpacity>
                    </View>}
                </View>

            </>}

            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});