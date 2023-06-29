// Copyright 2023 Peter Chen
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { redirect } from 'react-router-dom';
import {
  getContact, 
  getContacts,
  updateContact,
  createContact,
  deleteContact,
} from '../contacts';

export async function toEditAction() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function queryContactLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const contacts = await getContacts(q);
  return { contacts, q };
}


export async function updateFavoriteAction({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

export async function contactLoader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { contact };
}

export async function updateContactAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}


export async function deleteContactAction({ params }) {
  await deleteContact(params.contactId);
  return redirect('/');
}
