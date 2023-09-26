import { FC, LegacyRef, memo, useCallback, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import {
  parsePostsItemModelToDto,
  PostsItemModel,
  usePostUpdating,
} from '@entities/post'
import { ButtonSymbol } from '@shared/ui/button-symbol'

import {
  StyledPostEditor,
  StyledPostEditorBody,
  StyledPostEditorTitle,
  StyledToolbar,
} from './post-editor.style'

const message = 'This field is required'
const validationSchema = z.object({
  body: z.string().min(1, { message }),
  name: z.string().min(5, { message }),
})

type ValidationSchema = z.infer<typeof validationSchema>

type Props = PostsItemModel & {
  closePostEditor: () => void
}

const PostEditor: FC<PropsWithEmotionNaming<Props>> = ({
  body,
  closePostEditor,
  id,
  name,
  setClassName,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const { isLoading, mutate: updatePost } = usePostUpdating({ id })

  const queryClient = useQueryClient()

  const nameInput: LegacyRef<HTMLInputElement> | undefined = useRef(null)
  const { ref: nameRef, ...nameRest } = register('name')

  const onSubmit: SubmitHandler<ValidationSchema> = useCallback(
    (data) => {
      updatePost(parsePostsItemModelToDto({ ...data, id, userId }))
      queryClient.invalidateQueries(['postsReading']).then(() => {})
      closePostEditor()
    },
    [closePostEditor, id, queryClient, updatePost, userId],
  )

  useEffect(() => {
    nameInput.current?.focus()
  }, [])

  return (
    <StyledPostEditor
      className={setClassName('PostEditor')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledPostEditorTitle
        className={setClassName('PostEditorTitle', 'mb-2 text-3xl', {
          'bg-red': errors.name,
        })}
        defaultValue={name}
        id="name"
        placeholder="Title of the post"
        ref={(event) => {
          nameRef(event)
          // @ts-ignore
          nameInput.current = event
        }}
        {...nameRest}
      />
      {errors.name && (
        <div className="-mt-3 h-3 text-[8px] text-red-500">
          {errors.name?.message}
        </div>
      )}
      <StyledPostEditorBody
        className={setClassName('PostEditorBody', 'mb-2 text-3xl', {
          'bg-red': errors.body,
        })}
        defaultValue={body}
        id="body"
        placeholder="Body of the post"
        rows={3}
        wrap="off"
        {...register('body')}
      />
      {errors.body && (
        <div className="-mt-3 h-3 text-[8px] text-red-500">
          {errors.body?.message}
        </div>
      )}
      <StyledToolbar className={setClassName('Toolbar')}>
        <ButtonSymbol
          className="text-[0.7rem] !text-red-500"
          handleClick={closePostEditor}
          label="cancel"
          renderLogId={`post-editor.cancel.${id}`}
        />
        <ButtonSymbol
          className="text-[0.7rem] !text-red-500"
          disabled={isLoading || !isValid}
          label="save"
          renderLogId={`post-editor.save.${id}`}
          type="submit"
        />
      </StyledToolbar>
    </StyledPostEditor>
  )
}

export default memo(withEmotionNaming(withRenderLog(PostEditor)))
