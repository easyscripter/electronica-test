<template>
    <v-container fluid>
        <div class="text-md-h4 mt-5">
            Пользователи
        </div>
        <div class="mt-5">
            <div class="text-md-h6 mt-10">
                Добавить пользователя
            </div>
            <v-form ref="form" v-model="valid">
                <v-container fluid>
                    <v-row>
                        <v-col md="2">
                            <v-text-field 
                                v-model="name" 
                                :rules="nameRules" 
                                label="Имя" 
                                outlined
                                required
                                dense
                            />
                        </v-col>
                        <v-col md="10"></v-col>
                        <v-col md="2">
                            <v-text-field 
                                v-model="lastname" 
                                :rules="nameRules" 
                                label="Фамилия" 
                                outlined
                                required 
                                dense
                            />
                        </v-col>
                        <v-col md="10"></v-col>
                        <v-col md="2">
                            <v-text-field 
                                v-model="email" 
                                :rules="emailRules" 
                                label="E-mail" 
                                outlined
                                required 
                                dense
                            />
                        </v-col>
                        <v-col md="10"></v-col>
                        <v-col md="4">
                            <v-btn 
                                color="green"
                                @click="addUser"
                            >
                                Добавить пользователя
                            </v-btn>
                        </v-col>
                        <v-col md="8"></v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
        <div class="mt-5">
            <v-data-table 
                :headers="headers" 
                :items="users" 
                item-key="id"
            >
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr
                            v-for="item in items"
                            :key="item.id"
                            v-on:click.self="showDetails(item)"
                        >
                            <td v-if="isEditing && item.id === editingUser.id">
                                <v-text-field 
                                    v-model="editingUser.name" 
                                    :rules="nameRules" 
                                    outlined
                                    required
                                    dense
                                />
                            </td>
                            <td v-else > {{ item.name }}</td>
                            <td v-if="isEditing && item.id === editingUser.id">
                                <v-text-field 
                                    v-model="editingUser.surname" 
                                    :rules="nameRules" 
                                    label="Фамилия" 
                                    outlined
                                    required 
                                    dense
                                />
                            </td>
                            <td v-else> {{ item.surname }}</td>
                            <td v-if="isEditing && item.id === editingUser.id">
                                <v-text-field 
                                    v-model="editingUser.email" 
                                    :rules="emailRules" 
                                    label="E-mail" 
                                    outlined
                                    required 
                                    dense
                                />
                            </td>
                            <td v-else> {{ item.email }}</td>
                            <td> {{ item.friends.length }}</td>
                            <td v-if="isEditing && item.id === editingUser.id">
                                <v-btn
                                    class="mr-2"
                                    @click="confirmEditing(item)"
                                >
                                    Сохранить
                                </v-btn>
                            </td>
                            <td v-else>
                                <v-btn
                                    class="mr-2"
                                    @click="editUser(item)"
                                >
                                    Редактировать
                                </v-btn>
                                <v-btn
                                    @click="deleteUser(item)"
                                >
                                    Удалить
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
            <v-dialog v-model="isShowDialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Вы точно хотите удалить пользователя?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDeleteModal">Отмена</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteUserConfirm">Да</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'Users',
    data: () => ({
        users: [],
        headers: [
            {
                text: 'Имя',
                align: 'start',
                value: 'name',
            },
            {
                text: 'Фамилия',
                align: 'start',
                value: 'surname',
            },
            {
                text: 'Почта',
                align: 'start',
                value: 'email',
            },
            {
                text: 'Кол-во друзей',
                align: 'start',
                value: 'friends',
            },
            { 
                text: 'Действия', 
                align: 'start', 
                value: 'actions', 
            }
        ],
        editingUser: {
            id: 0,
            name: '',
            surname: '',
            email: '',
            friends: [],
        },
        valid: false,
        name: '',
        nameRules: [
            value => !!value || 'Обязательное поле',
            value => value.length >= 3 || 'Имя должно быть минимум 3 символа'
        ],
        lastname: '',
        email: '',
        emailRules: [
            value => !!value || 'Обязательное поле',
            value => /.+@.+/.test(value) || 'указан неправильный E-mail',
        ],
        isShowDialogDelete: false,
        isEditing: false,
        deletingUserIndex: 0,
    }),
    methods: {
        addUser() {
           const isValid = this.$refs.form.validate();
           if (!isValid) return;

           let user = {
                id: Math.floor(Math.random() * 10) + 1,
                name: this.name,
                surname: this.lastname,
                email: this.email,
                friends: []
           }
           this.users.push(user);
        },
        deleteUser(item) {
            this.isShowDialogDelete = true;
            this.deletingUserIndex = this.users.indexOf(item); 
        },
        deleteUserConfirm() {
            this.users.splice(this.deletingUserIndex, 1);
            this.isShowDialogDelete = false;
        },
        editUser(item) {
            this.editingUser = item;
            this.isEditing = true;
        },
        closeDeleteModal() {
            this.isShowDialogDelete = false;
        },
        showDetails(item) {
            this.$router.push({ path: `/profile/${item.id}`})
        },
        confirmEditing() {
            const editingUserIndex = this.users.indexOf(this.editingUser);
            Object.assign(this.users[editingUserIndex], this.editingUser);
            this.isEditing = false;
        }
    }
}
</script>