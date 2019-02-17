from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework import status
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters import rest_framework as filters
import numpy as np
from sklearn import neighbors
import http.client, urllib.request, urllib.parse, urllib.error, base64
import json
import os
import requests
from .models import (
    AuthenModel,
    UserAccount,
)

from django.db import IntegrityError
from rest_framework.parsers import JSONParser

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.settings import api_settings

from .util import random_with_N_digits

from django.core.files.storage import default_storage
from django.conf import settings

pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
paginator = pagination_class()


class UserViweSet(viewsets.ModelViewSet):
    queryset = AuthenModel.objects.all()
    permission_classes = [IsAdminUser]

    @action(detail=True, methods=['post'])
    def entrol_user(self, request, pk=None):
        passcode = request.data['passcode']
        time_one = request.data['timeone']
        time_two = request.data['timetwo']
        time_three = request.data['timethree']

        dic = {
            "passcode": passcode,
            "timeone": time_one.split(','),
            "timetwo": time_two.split(','),
            "timethree": time_three.split(','),
        }
        face_path = settings.MEDIA_ROOT + "/uploads/face/" + request.FILES['face'].name
        save_face_image = default_storage.save(face_path, request.FILES['face'])
        pressures = request.data['pressures'].split(',')

        print("====pressure",pressures)
        
        k = 0
        p = []
        for i in pressures:
            if len(i) < 7:
                value = '0'
            else:
                value = i[4] + i[5] + i[6] + i[7]
            p.append(float(value))

        

        code = random_with_N_digits(4)

        usertimeone = UserAccount()
        usertimeone.passcode = int(dic["passcode"])
        usertimeone.timeone = float(dic["timeone"][0])
        usertimeone.timetwo = float(dic["timeone"][1])
        usertimeone.timethree = float(dic["timeone"][2])

        usertimeone.pressure_1 = p[0]
        usertimeone.pressure_2 = p[1]
        usertimeone.pressure_3 = p[2]
        usertimeone.pressure_4 = p[3]

        usertimeone.class_name = code

        usertimetwo = UserAccount()
        usertimetwo.passcode = int(dic["passcode"])
        usertimetwo.timeone = float(dic["timetwo"][0])
        usertimetwo.timetwo = float(dic["timetwo"][1])
        usertimetwo.timethree = float(dic["timetwo"][2])

        usertimetwo.pressure_1 = p[4]
        usertimetwo.pressure_2 = p[5]
        usertimetwo.pressure_3 = p[6]
        usertimetwo.pressure_4 = p[7]

        usertimetwo.class_name = code

        usertimethree = UserAccount()
        usertimethree.passcode = int(dic["passcode"])
        usertimethree.timeone = float(dic["timethree"][0])
        usertimethree.timetwo = float(dic["timethree"][1])
        usertimethree.timethree = float(dic["timethree"][2])

        usertimethree.pressure_1 = p[8]
        usertimethree.pressure_2 = p[9]
        usertimethree.pressure_3 = p[10]
        usertimethree.pressure_4 = p[11]

        usertimethree.class_name = code

        # Verify duplicated face #
        # faceId = False
        # personId = False
        # image_path = os.path.join(save_face_image)
        # f = open(image_path, "rb")
        # body = f.read()
        # f.close()

        # headers = {
        #     'Content-Type': 'application/octet-stream',
        #     'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
        # }

        # params = urllib.parse.urlencode({
        #     'personGroupId': 'person_group_id_3'
        # })

        # try:
        #     conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
        #     conn.request("POST", "/face/v1.0/detect?%s" % params, body, headers)
        #     response = conn.getresponse()
        #     print(response.getcode())
        #     data = response.read().decode("utf-8")

        #     str_json = ""
        #     j = 0
        #     for i in data:
        #         if j == 0 or j == len(data) - 1:
        #             j += 1
        #             continue
        #         j += 1
        #         str_json += i
        #     detected_user = json.loads(str_json)
        #     faceId = detected_user['faceId']
        #     conn.close()
        # except Exception as e:
        #     # print("[Errno {0}] {1}".format(e.errno, e.strerror))
        #     print(e)

        # if faceId:
        #     headers = {
        #         'Content-Type': 'application/json',
        #         'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
        #     }
        #     params = urllib.parse.urlencode({
        #     })
        #     body_req = {
        #         'faceIds': [faceId],
        #         'personGroupId': 'person_group_id_3',
        #         'maxNumOfCandidatesReturned': 1,
        #         'confidenceThreshold': 0.5
        #     }
        #     try:
        #         conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
        #         conn.request("POST", "/face/v1.0/identify?%s" % params, bytes(json.dumps(body_req), encoding="utf-8"),
        #                      headers)
        #         response = conn.getresponse()
        #         data = response.read()
        #         print(response.getcode())
        #         result = data.decode("utf-8")
        #         str_json = ""
        #         j = 0
        #         for i in result:
        #             if j == 0 or j == len(result) - 1:
        #                 j += 1
        #                 continue
        #             j += 1
        #             str_json += i
        #         predicted_user = json.loads(str_json)
        #         if len(predicted_user['candidates']):
        #             personId = predicted_user['candidates'][0]['personId']
        #     except Exception as e:
        #         #print("[Errno {0}] {1}".format(e.errno, e.strerror))
        #         print(e)

        # if personId:
        #     return Response({'status': 'false', 'msg': "You already Registered"})

        # Create person #
        params = urllib.parse.urlencode({
            'personGroupId': 'person_group_id_4',
        })

        body_req = {
            "name": "person_{}".format(code),
        }

        headers = {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
        }
        personId = False
        try:
            conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
            conn.request("POST", "/face/v1.0/persongroups/{personGroupId}/persons?%s" % params,
                         bytes(json.dumps(body_req), encoding="utf-8"), headers)
            response = conn.getresponse()
            print(response.getcode())
            data = response.read().decode("utf-8")
            result = json.loads(data)
            personId = result['personId']
            print(personId)
            conn.close()
        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))

        # Add face #
        persistedFaceId = False
        if personId:
            headers = {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
            }
            params = urllib.parse.urlencode({
                'personGroupId': 'person_group_id_4',
                'personId': personId,
            })

            image_path = os.path.join(save_face_image)
            f = open(image_path, "rb")
            body = f.read()
            f.close()
            persistedFaceId = False
            try:
                conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
                conn.request("POST",
                             "/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces?%s" % params,
                             body, headers)
                response = conn.getresponse()
                print(response.getcode())
                data = response.read().decode("utf-8")
                result = json.loads(data)
                persistedFaceId = result['persistedFaceId']
                conn.close()
            except Exception as e:
                # print("[Errno {0}] {1}".format(e.errno, e.strerror))
                print(e)

            if persistedFaceId:
                headers = {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
                }
                params = urllib.parse.urlencode({
                    'personGroupId': 'person_group_id_4'
                })
                body_req = {
                }
                try:
                    conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
                    conn.request("POST", "/face/v1.0/persongroups/{personGroupId}/train?%s" % params,
                                 bytes(json.dumps(body_req), encoding="utf-8"), headers)
                    response = conn.getresponse()
                    print(response.getcode())
                    data = response.read()
                    conn.close()

                    # Rakuten Rapid API CoinBase, create account #

                    url = "https://CoinbasedimasV1.p.rapidapi.com/createAccount"
                    headers = {
                        "X-RapidAPI-Key": "c7e995fbb9msha80de32403dbc29p132598jsn57491f6d6a7c",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }

                    params = {
                        "name": personId,
                        "accessToken": "c7e995fbb9msha80de32403dbc29p132598jsn57491f6d6a7c"
                    }
                    r = requests.post(url, data=json.dumps(params), headers=headers)
                    print(r)

                    usertimeone.person_id = personId
                    usertimetwo.person_id = personId
                    usertimethree.person_id = personId
                    usertimeone.save()
                    usertimetwo.save()
                    usertimethree.save()
                    return Response({'status': 'true', 'msg': 'Registered successfully'})
                except Exception as e:
                    print("[Errno {0}] {1}".format(e.errno, e.strerror))

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def login(self, request, pk=None):
        all_records = UserAccount.objects.all()

        pressures = request.data['pressures'].split(',')
        times = request.data['time'].split(',')

        # print(pressures)
        # print(times)

        # arr = []
        # for i in times:
        #     arr.append(float(i))

        # for p in pressures:
        #     arr.append(float(p))

        # print(arr)
        # test = np.array(arr)
        # test = test.reshape(1, -1)

        # Detect #
        faceId = False
        personId = False

        face_path = settings.MEDIA_ROOT + "/login/face/" + request.FILES['face'].name
        save_face_image = default_storage.save(face_path, request.FILES['face'])
        image_path = os.path.join(save_face_image)
        f = open(image_path, "rb")
        body = f.read()
        f.close()

        headers = {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
        }

        params = urllib.parse.urlencode({
            'personGroupId': 'person_group_id_4'
        })

        try:
            conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
            conn.request("POST", "/face/v1.0/detect?%s" % params, body, headers)
            response = conn.getresponse()
            print(response.getcode())
            data = response.read().decode("utf-8")

            str_json = ""
            j = 0
            for i in data:
                if j == 0 or j == len(data) - 1:
                    j += 1
                    continue
                j += 1
                str_json += i
            detected_user = json.loads(str_json)
            faceId = detected_user['faceId']
            conn.close()
        except Exception as e:
            # print("[Errno {0}] {1}".format(e.errno, e.strerror))
            print(e)

        if faceId:
            # Identify #
            headers = {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
            }
            params = urllib.parse.urlencode({
            })
            body_req = {
                'faceIds': [faceId],
                'personGroupId': 'person_group_id_4',
                'maxNumOfCandidatesReturned': 1,
                'confidenceThreshold': 0.5
            }
            try:
                conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
                conn.request("POST", "/face/v1.0/identify?%s" % params, bytes(json.dumps(body_req), encoding="utf-8"),
                             headers)
                response = conn.getresponse()
                data = response.read()
                print(response.getcode())
                result = data.decode("utf-8")
                str_json = ""
                j = 0
                for i in result:
                    if j == 0 or j == len(result) - 1:
                        j += 1
                        continue
                    j += 1
                    str_json += i
                predicted_user = json.loads(str_json)
                if len(predicted_user['candidates']):
                    personId = predicted_user['candidates'][0]['personId']
            except Exception as e:
                print("[Errno {0}] {1}".format(e.errno, e.strerror))
        print(personId)
        if personId:
            class_name = 0
            features_arr = []
            classes_arr = []
            for record in all_records:
                features_arr.append([record.timeone, record.timetwo, record.timethree,
                                     record.pressure_1, record.pressure_2, record.pressure_3, record.pressure_4])
                classes_arr.append(record.class_name)
            x_train = np.array(features_arr)
            y_train = np.array(classes_arr)

            clf = neighbors.KNeighborsClassifier(n_neighbors=3)
            clf.fit(x_train, y_train)

            print(request.data)

            pressures = request.data['pressures'].split(',')
            times = request.data['time'].split(',')

            print(pressures)
            print(times)

            k = 0
            p = []
            for i in pressures:
                if len(i) < 7:
                    value = '0'
                else:
                    value = i[4] + i[5] + i[6] + i[7]
                p.append(k)
            print("====p",p)

            arr = []
            for i in times:
                arr.append(float(i))

            for i in p:
                arr.append(float(i))

            
            test = np.array(arr)
            test = test.reshape(1, -1)

            print('====person_id',personId)
            print('====test', test)

            class_users = UserAccount.objects.filter(passcode=request.data["passcode"], person_id=personId)[:1]
            for user in class_users:
                class_name = user.class_name
            result = clf.predict(test)
            if class_name == 0:
                return Response({'status': 'false', 'msg': 'Invalid Passcode'})
            if result[0] == class_name:
                userObj = UserAccount()
                userObj.passcode = int(request.data["passcode"])
                userObj.timeone = float(times[0])
                userObj.timetwo = float(times[1])
                userObj.timethree = float(times[2])
                userObj.class_name = class_name
                userObj.person_id = personId
                userObj.save()
                return Response({'status': 'true', 'msg': 'Welcome'})
            return Response({'status': 'false', 'msg': 'Unmatch Behaviour'})
        else:
            return Response({'status': 'false', 'msg': "Unmatch Face"})


    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def find_face(self, request, pk=None):
        print("====find_face")
        face_path = settings.MEDIA_ROOT + "/login/face/" + request.FILES['face'].name
        save_face_image = default_storage.save(face_path, request.FILES['face'])
        image_path = os.path.join(save_face_image)
        f = open(image_path, "rb")
        body = f.read()
        f.close()

        headers = {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
        }

        params = urllib.parse.urlencode({
            'personGroupId': 'person_group_id_4'
        })

        try:
            conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
            conn.request("POST", "/face/v1.0/detect?%s" % params, body, headers)
            response = conn.getresponse()
            print(response.getcode())
            data = response.read().decode("utf-8")

            str_json = ""
            j = 0
            for i in data:
                if j == 0 or j == len(data) - 1:
                    j += 1
                    continue
                j += 1
                str_json += i
            detected_user = json.loads(str_json)
            faceId = detected_user['faceId']
            conn.close()
        except Exception as e:
            # print("[Errno {0}] {1}".format(e.errno, e.strerror))
            print(e)

        if faceId:
            # Identify #
            headers = {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'cc53a778dd3d46f3b488190efdaa524b',
            }
            params = urllib.parse.urlencode({
            })
            body_req = {
                'faceIds': [faceId],
                'personGroupId': 'person_group_id_4',
                'maxNumOfCandidatesReturned': 1,
                'confidenceThreshold': 0.5
            }
            try:
                conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
                conn.request("POST", "/face/v1.0/identify?%s" % params, bytes(json.dumps(body_req), encoding="utf-8"),
                            headers)
                response = conn.getresponse()
                data = response.read()
                print(response.getcode())
                result = data.decode("utf-8")
                str_json = ""
                j = 0
                for i in result:
                    if j == 0 or j == len(result) - 1:
                        j += 1
                        continue
                    j += 1
                    str_json += i
                predicted_user = json.loads(str_json)
                if len(predicted_user['candidates']):
                    personId = predicted_user['candidates'][0]['personId']
                    return Response({'status': 'true', 'msg': personId})
                else:
                    return Response({'status': 'false', 'msg': 'face not found'})
            except Exception as e:
                print("[Errno {0}] {1}".format(e.errno, e.strerror))

        return Response({'status': 'false', 'msg': 'the face was not create'})


    # Rakuten Rapid API CoinBase, send money #
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def send_btc(self, request, pk=None):
        # Rakuten RapidAPI for Coinbase create account
        url = "https://CoinbasedimasV1.p.rapidapi.com/sendMoney"
        headers = {
            "X-RapidAPI-Key": "c7e995fbb9msha80de32403dbc29p132598jsn57491f6d6a7c",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        params = {
            "currency": "$",
            "to": "persion-id-oudom",
            "amount": "10",
            "accessToken": "FfY6k5h91J5ADslj"
        }
        r = requests.post(url, data=json.dumps(params), headers=headers)
        return Response({'status': 'true', 'msg': 'your BTC was been tranfer'})
